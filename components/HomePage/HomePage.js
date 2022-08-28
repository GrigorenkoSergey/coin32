import styled from 'styled-components';
import useSWR from 'swr';
import { useState } from 'react';

import Layout from '../Layout';
import GameCard from './GameCard';
import SortingBar from './SortingBar';
import Pagination from './Pagination';

const apiSrc = process.env.NEXT_PUBLIC_API_URL;
const key = process.env.NEXT_PUBLIC_API_KEY;
const PAGE_SIZE = 24;

const fetcher = async (page, pageSize) => {
  const res = await fetch(`${apiSrc}/games?${new URLSearchParams({
    page_size: pageSize,
    page: page,
    key,
  })}`);
  const data = await res.json();

  const totalPages = Math.ceil(data.count / pageSize);
  const games = data.results.map(g => {
    const { id, name, background_image: poster, rating, released } = g;
    return { id, name, poster, rating, released };
  });

  return { games, totalPages };
};

export default function HomePage({ platforms }) {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR([page, PAGE_SIZE], fetcher);

  const { games, totalPages } = data || {};
  if (error) return <h2>Faile to load games...</h2>;

  return (
    <Layout title="Select your Game!">
      <SortingBar platforms={platforms} />
      <CardsWrapper>
        { !games && <h2>Loading...</h2> }
        { games && games.map(g => <GameCard key={g.id} {...g} />) }
      </CardsWrapper>
      <PaginationStyled onSelect={setPage} curr={page} total={totalPages} />
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

const PaginationStyled = styled(Pagination)`
margin-top: 16px;
`;
