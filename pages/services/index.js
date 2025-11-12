export default function ServicesIndex() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/services/overview',
      permanent: true,
    },
  };
}
