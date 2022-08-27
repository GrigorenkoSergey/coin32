import styled from 'styled-components';

import Layout from '../Layout';
import GameCard from './GameCard';
import SortingBar from './SortingBar';

export default function HomePage({ games, platforms }) {
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
