import styled from 'styled-components';
import useSWR from 'swr';

import Layout from '../Layout';
import GameCard from './GameCard';
import SortingBar from './SortingBar';

const apiSrc = process.env.NEXT_PUBLIC_API_URL;
const key = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = async (page, pageSize) => {
  const res = await fetch(`${apiSrc}/games?${new URLSearchParams({
    page_size: pageSize,
    page: page,
    key,
  })}`);
  const data = await res.json();

  const games = data.results.map(g => {
    const { id, name, background_image: poster, rating, released } = g;
    return { id, name, poster, rating, released };
  });

  return games;
};

export default function HomePage({ platforms }) {
  const { data: games, error } = useSWR([1, 10], fetcher);

  if (error) return <h2>Faile to load games...</h2>;
  if (!games) return <h2>Loading...</h2>;

  return (
    <Layout title="Select your Game!">
      <SortingBar platforms={platforms} />
      <CardsWrapper>
        { games.map(g => <GameCard key={g.id} {...g} />) }
      </CardsWrapper>
    </Layout>
  );
}

const CardsWrapper = styled.section`
margin-top: 16px;
display: flex;
flex-direction: column;
${p => p.theme.flexGaps({ vgap: 10 })}

@media ${p => p.theme.media.tablet} {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  && > * {
    margin-top: 0;
  }
}

@media ${p => p.theme.media.laptop} {
  grid-template-columns: 1fr 1fr 1fr;
}

@media ${p => p.theme.media.desktop} {
  grid-template-columns: repeat(4, 1fr);
}
`;
