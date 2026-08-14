const mockSend = jest.fn();
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({ emails: { send: mockSend } })),
}));

import handler, { contactSchema, escapeHtml } from '@/pages/api/contact';

const valid = {
  name: 'Example Person',
  email: 'person@example.org',
  language: 'English',
  role: 'country-general-manager',
  organisation: 'Example Manufacturing UK Ltd',
  context: 'hq-local-expectations',
  payer: 'organisation',
  useful: 'I need to align headquarters expectations with what the UK team can realistically deliver.',
  privacy: true,
};

describe('contact API validation', () => {
  const request = (body = valid) => ({ method: 'POST', body } as any);
  const response = () => {
    const res: any = { statusCode: 200, body: null, headers: {} };
    res.setHeader = jest.fn((key, value) => { res.headers[key] = value; });
    res.status = jest.fn((code) => { res.statusCode = code; return res; });
    res.json = jest.fn((body) => { res.body = body; return res; });
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_EMAIL_FROM = 'website@example.org';
    process.env.RESEND_EMAIL_TO = 'coach@example.org';
  });

  it('accepts a complete confidential coaching enquiry', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, context: 'organisational-change' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, context: 'resistance-adoption' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, context: 'cross-border-role' }).success).toBe(false);
  });

  it('rejects missing privacy acknowledgement and short context', () => {
    expect(contactSchema.safeParse({ ...valid, privacy: false }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, useful: 'Too short' }).success).toBe(false);
  });

  it('escapes user-controlled HTML', () => {
    expect(escapeHtml('<script>"x"</script>')).toBe('&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
  });

  it('returns success only after the provider accepts the email', async () => {
    mockSend.mockResolvedValue({ data: { id: 'mail-id' }, error: null });
    const res = response();
    await handler(request(), res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('returns a safe fallback when configuration is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const res = response();
    await handler(request(), res);
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toContain('hc.tsai@sustainsage-group.com');
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('does not claim success when the provider fails', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'provider failed' } });
    const res = response();
    await handler(request(), res);
    expect(res.statusCode).toBe(502);
    expect(res.body.error).toContain('hc.tsai@sustainsage-group.com');
  });
});
