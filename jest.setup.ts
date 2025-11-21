import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  const Link = ({ children, href, ...rest }: any) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href={href} {...rest}>
      {children}
    </a>
  );
  Link.displayName = 'NextLinkMock';
  return Link;
});

jest.mock('next/image', () => ({ src, alt }: any) => <img src={src} alt={alt} />);
