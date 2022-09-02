import GameInfoPage from '@/components/GameInfoPage';
export default GameInfoPage;

const apiSrc = process.env.API_URL;
const key = process.env.API_KEY;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const res = await fetch(`${apiSrc}/games/${slug}?key=${key}`);
  const data = await res.json();

  return { props: { slug, info: data, }, };
}
