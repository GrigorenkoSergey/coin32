import { createGlobalStyle, ThemeProvider } from 'styled-components';

const theme = {
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
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
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
