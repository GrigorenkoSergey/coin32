import { createGlobalStyle, ThemeProvider } from 'styled-components';

const theme = {
  bgColor: '#151515',
  fontColor: '#FFF',

  flexGaps,

  media: {
    tablet: '(min-width: 481px)',
    laptop: '(min-width: 769px)',
    desktop: '(min-width: 1025px)',
    TV: '(min-width: 1201px)',
  }
};

const Global = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background: black;
  color: white;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background-color: #FFFFFF;
  border-radius: 100px;
}

*::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 100px;
}
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// use only in flex-containers
// vgap, hgap in pixels
function flexGaps({ vgap = 0, hgap = 0 } = {}) {
  return (
    `& > *:not(:first-child) {
      margin-top: ${vgap}px;
      margin-left: ${hgap}px;
    }`
  );
}
