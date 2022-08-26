import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ title }) {
  return (
    <Container>
      <Link href="/">
        <HomeLink><Image src="/icons/home.svg" alt="home" width={30} height={30} /></HomeLink>
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
flex-grow: 1;
text-align: center;
`;
