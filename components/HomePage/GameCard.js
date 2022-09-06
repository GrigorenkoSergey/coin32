import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const fallbackImg = '/no-image.jpg';
export default function GameCard({ name, poster, rating, released, slug }) {
  return (
    <Container>
      <Link href={`/game/${slug}`} passHref>
        <ImageWrapper>
          <Image src={poster || fallbackImg}
                 alt="poster"
                 layout="fill"
                 placeholder="blur"
                 sizes="(min-width: 1440px) 360px,
                        (min-width: 1025px) 25vw,
                        (min-width: 769px) 33vw,
                        (min-width: 481px) 50vw,
                        100vw"
                 blurDataURL={poster || fallbackImg} />
        </ImageWrapper>
      </Link>
      <GameName>{ name }</GameName>
      <RowTitle>Rating:</RowTitle>
      <RowValue>{ rating }</RowValue>
      <RowTitle>Released:</RowTitle>
      <RowValue>{ released || 'No data' }</RowValue>
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

const ImageWrapper = styled.a`
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
