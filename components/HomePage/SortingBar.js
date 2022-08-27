import { useState } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const mockPlatforms = [
  { id: '0', text: 'all' },
  { id: '1', text: 'platform-1' },
  { id: '2', text: 'platform-2' },
  { id: '3', text: 'platform-3' },
];
const orderList = [
  { id: 'rating', text: 'Rating: best first' },
  { id: '-rating', text: 'Rating: worst first' },
  { id: 'release', text: 'Release: new first' },
  { id: '-release', text: 'Release: old first' },
];

export default function SortingBar() {
  const [order, setOrder] = useState(orderList[0]);
  const [platform, setPlatform] = useState(mockPlatforms[0]);

  return (
    <Container>
      <GameSpan>Game:</GameSpan>
      <Search type="text" alt="search" placeholder="search by name" />
      <span>Platform:</span>
      <Dropdown list={mockPlatforms} zIndex={10} selectedItem={platform} onSelect={setPlatform} />
      <OrderSpan>Order&nbsp;by:</OrderSpan>
      <Dropdown list={orderList} zIndex={10} selectedItem={order} onSelect={setOrder} />
    </Container>
  );
}

const Container = styled.section`
display: grid;
grid-template-columns: auto 1fr;
align-items: center;
gap: 5px 10px;
padding: 5px;
border: 1px solid black;
border-radius: 8px;

@media (min-width: 500px) {
  grid-template-columns: repeat(2, auto minmax(150px, 1fr));
}

@media ${p => p.theme.media.laptop} {
  grid-auto-flow: dense;
  grid-template-columns: repeat(3, auto 1fr);
}

@media ${p => p.theme.media.desktop} {
  grid-template-columns: repeat(2, auto 1fr) auto 2fr;
}

span {
  font-size: 14px;
}
`;

const GameSpan = styled.span`
@media ${p => p.theme.media.laptop} {
  grid-column: 5;
  padding-left: 10px;
}
`;

const Search = styled.input`
  border-radius: 10000px;
  border: 1px solid black;
  outline: none;
  padding: 5px 35px 5px 10px;
  font-size: 14px;
  background-image: url('/icons/search.svg');
  background-repeat: no-repeat;
  background-position: center right 10px;
  background-size: 20px;

  @media ${p => p.theme.media.tablet} {
    grid-column: 2 / -1;
  }

  @media ${p => p.theme.media.laptop} {
    grid-column: 6;
  }

  &:focus {
    box-shadow: 0 0 5px gray;
  }
`;

const OrderSpan = styled.span`
@media (min-width: 500px) {
  padding-left: 10px;
}
`;
