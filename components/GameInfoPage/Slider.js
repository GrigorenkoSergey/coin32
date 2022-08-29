import styled from 'styled-components';
import useSWR from 'swr';
import Image from 'next/image';

const apiSrc = process.env.NEXT_PUBLIC_API_URL;
const key = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = async ({ slug, }) => {
  const searchStr = new URLSearchParams({ key, });
  const query = `${apiSrc}/games/${slug}/screenshots?${searchStr}`;

  const res = await fetch(query);
  const data = await res.json();
  return data;
};

export default function Slider({ slug }) {
  const { data, error } = useSWR({ slug }, fetcher);

  if (error) return <h2>Failed to load games...</h2>;

  return (
    <Container>
      { !data && <h2>Loading...</h2> }
      { data && data.results.map(img => (
        <ImageWrapper key={img.id}>
          <Image src={img.image}
                 layout="fill"
                 alt="screenshot"
                 placeholder="blur"
                 blurDataURL={img.image} />
        </ImageWrapper>
      )) }
    </Container>
  );
}

const Container = styled.div`
`;

const ImageWrapper = styled.div`
height: 250px;
position: relative;

img {
  object-fit: scale-down;
}
`;
