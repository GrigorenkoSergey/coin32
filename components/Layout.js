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

const Container = styled.section`
max-width: 1280px;
min-height: 100vh;
display: flex;
flex-direction: column;
margin: 0 auto;
padding: 5px;
max-width: 380px;

background-color: ${p => p.theme.bgColor};
color: ${p => p.theme.fontColor};

@media ${p => p.theme.media.tablet} {
  max-width: 100%;
}
`;
