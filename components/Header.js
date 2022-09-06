import { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { HomeCtx } from './HomePage';
import HomeSvg from '@/icons/home.svg';

export default function Header({ title }) {
  const homeCtx = useContext(HomeCtx);
  const homeLinkHref = {
    pathname: '/',
    query: homeCtx.current,
  };

  return (
    <Container>
      <Link href={homeLinkHref} passHref>
        <HomeLink>
          <HomeSvg width={30} height={30} />
        </HomeLink>
      </Link>

      <Title>{ title }</Title>
    </Container>
  );
}

const Container = styled.header`
display: flex;
align-items: center;
`;

const HomeLink = styled.a`
cursor: pointer;
padding: 5px;
`;

const Title = styled.h1`
margin: 10px 0;
flex-grow: 1;
text-align: center;
`;
