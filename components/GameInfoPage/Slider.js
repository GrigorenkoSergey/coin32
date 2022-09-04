import { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Image from 'next/image';
import ArrowSvg from '@/icons/arrow.svg';

const apiSrc = '/api';

const fetcher = async ({ slug }) => {
  const query = `${apiSrc}/games/${slug}/screenshots?`;
  const res = await fetch(query);
  const data = await res.json();
  return data;
};

const fallbackImg = '/no-image.jpg';

export default function Slider({ className, slug }) {
  const { data, error } = useSWR({ slug }, fetcher);
  const [imageNum, setImageNum] = useState(0);

  if (error) return <h2>Failed to load games...</h2>;
  const { count } = data || {};

  return (
    <Container className={className}>
      { !data && <h2>Loading...</h2> }

      { data && (
        <ImageWrapper>
          { imageNum > 0 && (
            <Arrow dir="left" onClick={() => setImageNum(imageNum - 1)}>
              <ArrowSvg width={25} height={25} />
            </Arrow>
          ) }

          { data && data.results.map((img, i) => (
            <Image key={i}
                   src={img.image || fallbackImg}
                   style={{ zIndex: i === imageNum ? '1' : '-1' }}
                   layout="fill"
                   alt="screenshot"
                   placeholder="blur"
                   sizes="(min-width: 1440px) 1440px,
                          100vw"
                   blurDataURL={img.image || fallbackImg} />
          )) }

          { imageNum < count - 1 && (
            <Arrow dir="right" onClick={() => setImageNum(imageNum + 1)}>
              <ArrowSvg width={25} height={25} />
            </Arrow>
          ) }
        </ImageWrapper>
      ) }

      { data && <Text> { `${imageNum + 1} of ${count}` }</Text> }
    </Container>
  );
}

const Container = styled.div`
border-radius: 5px;
border: 1px solid;
`;

const ImageWrapper = styled.div`
height: 80vh;
max-height: 78vw;
position: relative;
user-select: none;

img {
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}
`;

const Arrow = styled.div`
position: absolute;
display: flex;
align-items: center;
height: 100%;
width: 30px;
z-index: 5;
${p => p.dir === 'left' ? 'left: 0' : 'right: 0'};

&:hover {
  cursor: pointer;
  background: #00000030;
}

svg {
  transform: rotate(${p => p.dir === 'left' ? '90deg' : '-90deg'});
}
`;

const Text = styled.p`
padding: 8px 0;
margin: 0;
text-align: center;
`;
