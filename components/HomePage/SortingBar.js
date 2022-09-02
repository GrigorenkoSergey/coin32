import styled from 'styled-components';
import Dropdown from './Dropdown';
import Search from './Search';

export default function SortingBar({
  platformList,
  platform,
  onSelectPlatform,
  orderList,
  order,
  onSelectOrder,
  searchValue,
  onSearchEnter
}) {
  return (
    <Container>
      <GameSpan>Game:</GameSpan>
      <SearchStyled onEnter={onSearchEnter} startValue={searchValue} />
      <span>Platform:</span>
      <Dropdown list={platformList}
                defaultSelected={platform}
                onSelect={onSelectPlatform}
                zIndex={10} />

      <OrderSpan>Order&nbsp;by:</OrderSpan>

      <Dropdown list={orderList}
                defaultSelected={order}
                onSelect={onSelectOrder}
                zIndex={5} />
    </Container>
  );
}

const Container = styled.section`
display: grid;
grid-template-columns: auto 1fr;
align-items: center;
gap: 5px 10px;
padding: 10px 5px;
border: 1px solid;
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

const SearchStyled = styled(Search)`
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

const GameSpan = styled.span`
@media ${p => p.theme.media.laptop} {
  grid-column: 5;
  padding-left: 10px;
}
`;

const OrderSpan = styled.span`
@media (min-width: 500px) {
  padding-left: 10px;
}
`;
