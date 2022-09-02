import styled from 'styled-components';
import useSWR from 'swr';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';
import { HomeCtx } from './context';
import GameCard from './GameCard';
import SortingBar from './SortingBar';
import Pagination from './Pagination';

const orderList = [
  { id: '', text: 'No ordering' },
  { id: '-rating', text: 'Rating: best first' },
  { id: 'rating', text: 'Rating: worst first' },
  { id: '-released', text: 'Release: new first' },
  { id: 'released', text: 'Release: old first' },
];

const fetcher = async apiSrc => {
  const res = await fetch(`${apiSrc}/platforms`);
  const data = await res.json();
  return { platforms: data };
};

export default function HomePage({ games, totalPages }) {
  const router = useRouter();
  const { data } = useSWR('/api', fetcher);
  const ctx = useContext(HomeCtx);

  const { page = 1, platform, ordering, search = '' } = router.query;
  ctx.current = router.query;

  const { platforms: platformsOrigin = [] } = data || {};
  const platforms = [{ id: 0, text: 'all' }, ...platformsOrigin];

  const platformItem = platform ? platforms.find(el => el.id === platform) : platforms[0];
  const orderItem = ordering ? orderList.find(el => el.id === ordering) : orderList[0];

  const handleSearchEnter = search => {
    router.push({ query: { search, page: 1 } });
  };

  const handleSelectPlatform = platform => {
    router.push({ query: { platform: platform.id, page: 1 } });
  };

  const handleSelectOrder = order => {
    router.push({ query: { ordering: order.id, page: 1 } });
  };

  return (
    <Layout title="Select your Game!">
      <SortingBar platformList={platforms}
                  platform={platformItem}
                  order={orderItem}
                  orderList={orderList}
                  searchValue={search}
                  onSearchEnter={handleSearchEnter}
                  onSelectPlatform={handleSelectPlatform}
                  onSelectOrder={handleSelectOrder} />

      <CardsWrapper>
        { games.map(g => <GameCard key={g.slug} {...g} />) }
      </CardsWrapper>

      <PaginationStyled curr={Number(page)}
                        total={totalPages} />
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
