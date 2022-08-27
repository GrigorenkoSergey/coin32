import styled from 'styled-components';
import Link from 'next/link';
import HomeSvg from '@/icons/home.svg';

export default function Header({ title }) {
  return (
    <Container>
      <Link href="/">
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
