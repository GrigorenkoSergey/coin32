import HomePage from '@/components/HomePage';
export default HomePage;

const PAGE_SIZE = 12;
const apiSrc = process.env.API_URL;
const key = process.env.API_KEY;

export const getServerSideProps = async context => {
  const { page = 1, ordering = '', platform = '', search = '', } = context.query;

  const searchStr = new URLSearchParams({
    page_size: PAGE_SIZE,
    page: page,
    key,
  });

  if (ordering) searchStr.append('ordering', ordering);
  if (platform) searchStr.append('platforms', platform);
  if (search) searchStr.append('search', search);

  const res = await fetch(`${apiSrc}/games?${searchStr}`);
  const data = await res.json();

  const totalPages = Math.ceil(data.count / PAGE_SIZE);
  const games = data.results.map(g => {
    const { slug, name, background_image: poster, rating, released } = g;
    return { slug, name, poster, rating, released };
  });

  return { props: { games, totalPages } };
};
