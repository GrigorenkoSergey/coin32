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

const orderList = [
  { id: '-rating', text: 'Rating: best first' },
  { id: 'rating', text: 'Rating: worst first' },
  { id: '-released', text: 'Release: new first' },
  { id: 'released', text: 'Release: old first' },
];

const fetcher = async ({ page, ordering, platform, search } = {}) => {
  const searchStr = new URLSearchParams({
    page_size: PAGE_SIZE,
    page: page,
    key,
    ordering,
  });

  if (platform) searchStr.append('platforms', platform);
  if (search) searchStr.append('search', search);

  const res = await fetch(`${apiSrc}/games?${searchStr}`);
  const data = await res.json();

  const totalPages = Math.ceil(data.count / PAGE_SIZE);
  const games = data.results.map(g => {
    const { id, name, background_image: poster, rating, released } = g;
    return { id, name, poster, rating, released };
  });

  return { games, totalPages };
};

export default function HomePage({ platforms: platformsOrigin }) {
  const platforms = [{ id: 0, text: 'all' }, ...platformsOrigin];

  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState(platforms[0]);
  const [order, setOrder] = useState(orderList[0]);
  const [search, setSearch] = useState('');

  const { data, error } = useSWR({
    page,
    platform: platform.id,
    ordering: order.id,
    search
  }, fetcher);

  if (error) return <h2>Failed to load games...</h2>;

  const { games, totalPages } = data || {};

  return (
    <Layout title="Select your Game!">
      <SortingBar platformList={platforms}
                  platform={platform}
                  order={order}
                  orderList={orderList}
                  onSearchEnter={setSearch}
                  onSelectPlatform={setPlatform}
                  onSelectOrder={setOrder} />

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
