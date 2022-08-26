import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ title, children }) {
  return (
    <Container>
      <Header title={title} />
      { children }
      <Footer />
    </Container>
  );
}

const Container = styled.div`
max-width: 1280px;
min-height: 100vh;
display: flex;
flex-direction: column;
margin: 0 auto;
`;
