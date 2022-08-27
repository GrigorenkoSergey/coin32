import HomePage from '@/components/HomePage';

const apiSrc = 'https://api.rawg.io/api';
const key = process.env.API_KEY;

export const getStaticProps = async () => {
  const [gamesRequest, platformsRequest] = await Promise.all([
    fetch(`${apiSrc}/games?${new URLSearchParams({
      page_size: 50,
      page: 1,
      key,
    })}`),

    fetch(`${apiSrc}/platforms?${new URLSearchParams({ key })}`),
  ]);

  const [dataGames, dataPlatforms] = await Promise.all([gamesRequest, platformsRequest]
    .map(r => r.json()));

  const games = dataGames.results.map(g => {
    const { id, name, background_image: poster, rating, released } = g;
    return { id, name, poster, rating, released };
  });
  const platforms = dataPlatforms.results.map(({ id, name: text }) => ({ id, text }));

  return { props: { games, platforms } };
};

const Home = HomePage;
export default Home;
