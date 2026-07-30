// eslint-disable-next-line @typescript-eslint/no-var-requires
const { redirectMap } = require('@/lib/redirectMap');

describe('redirect map', () => {
  it('uses unique permanent sources', () => {
    expect(new Set(redirectMap.map((item) => item.source)).size).toBe(redirectMap.length);
    expect(redirectMap.every((item) => item.permanent)).toBe(true);
  });

  it('consolidates services, personas and team routes', () => {
    expect(redirectMap).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: '/services/reset-sprint', destination: '/coaching' }),
      expect.objectContaining({ source: '/for/newcomers-to-uk', destination: '/coaching?focus=new-to-uk' }),
      expect.objectContaining({ source: '/about/team/:path*', destination: '/about' }),
    ]));
  });
});
