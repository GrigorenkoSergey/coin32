import styled from 'styled-components';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';

export default function Layout({ title, children }) {
  return (
    <Container>
      <Head><title>Game App</title></Head>
      <Header title={title} />
      { children }
      <Footer />
      <Loader />
    </Container>
  );
}

const Container = styled.section`
min-height: 100vh;
display: flex;
flex-direction: column;
margin: 0 auto;
padding: 5px;
max-width: 380px;

background-color: ${p => p.theme.bgColor};
color: ${p => p.theme.fontColor};

@media ${p => p.theme.media.tablet} {
  max-width: 1440px;
}
`;
