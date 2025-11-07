export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/services',
      permanent: false,
    },
  };
}

export default function ServiceRedirect() {
  return null;
}
