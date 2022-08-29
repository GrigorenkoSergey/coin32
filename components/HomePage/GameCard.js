import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const noImageSrc = '/no-image.jpg';
export default function GameCard({ name, poster, rating, released, slug }) {
  return (
    <Container>
      <Link href={`/game/${slug}`}>
        <ImageWrapper>
          <Image src={poster || noImageSrc}
                 alt="poster"
                 layout="fill"
                 placeholder="blur"
                 blurDataURL={poster || noImageSrc} />
        </ImageWrapper>
      </Link>
      <GameName>{ name }</GameName>
      <RowTitle>Rating:</RowTitle>
      <RowValue>{ rating }</RowValue>
      <RowTitle>Released:</RowTitle>
      <RowValue>{ released }</RowValue>
    </Container>
  );
}

const Container = styled.div`
padding: 8px;
border-radius: 5px;
border: 1px solid;

display: grid;
grid-template-columns: auto auto;
align-items: center;
grid-row-gap: 4px;
`;

const ImageWrapper = styled.div`
cursor: pointer;
position: relative;
min-height: 150px;
grid-column: 1 / -1;
border: 1px solid;
border-radius: 5px;

img {
  object-fit: scale-down;
}
`;

const GameName = styled.h3`
grid-column: 1 / -1;
text-align: center;
margin: 8px 0;
`;

const RowTitle = styled.span`
font-weight: bold;
`;

const RowValue = styled.span`
justify-self: end;
`;
