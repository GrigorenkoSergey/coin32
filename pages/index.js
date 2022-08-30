import HomePage from '@/components/HomePage';
export default HomePage;

const apiSrc = process.env.NEXT_PUBLIC_API_URL;
const key = process.env.NEXT_PUBLIC_API_KEY;

export const getStaticProps = async () => {
  const res = await fetch(`${apiSrc}/platforms?${new URLSearchParams({ key })}`);
  const data = await res.json();
  const platforms = data.results.map(({ id, name: text }) => ({ id, text }));

  return { props: { platforms } };
};
