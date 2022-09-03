import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoaderSvg from '@/icons/loader.svg';

export default function Loader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = url => (url !== router.asPath) && setLoading(true);
    const handleComplete = url => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <>
      { loading && (
        <StyledLoader>
          <LoaderSvg />
        </StyledLoader>
      ) }
    </>
  );
}

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const StyledLoader = styled.div`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
z-index: 9999;

svg {
  fill: lavender;
  animation: ${spin} 2s infinite linear forwards;
}
`;
