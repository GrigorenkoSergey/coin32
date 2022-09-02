import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Pagination({ className, curr = 1, total }) {
  const router = useRouter();
  const pagePath = num => ({
    pathname: router.pathname,
    query: { ...router.query, page: num },
  });

  let [leftPage, centerPage, rightPage] = [1, 2, 3];
  if (curr > 1 && curr < total) [leftPage, centerPage, rightPage] = [curr - 1, curr, curr + 1];
  else if (curr > 1 && curr === total) [leftPage, centerPage, rightPage] = [curr - 2, curr - 1, curr];

  return (
    <Container className={className}>
      <Switcher disabled={leftPage < 3}
                href={pagePath(1)}>
        { '<<' }
      </Switcher>

      <Switcher disabled={leftPage < 2}
                href={pagePath(leftPage - 1)}>
        { '<' }
      </Switcher>

      <Switcher href={pagePath(leftPage)}
                isCurrent={leftPage === curr}>
        { leftPage }
      </Switcher>

      <Switcher href={pagePath(centerPage)}
                disabled={centerPage > total}
                isCurrent={centerPage === curr}>
        { centerPage }
      </Switcher>

      <Switcher disabled={rightPage > total}
                href={pagePath(rightPage)}
                isCurrent={rightPage === curr}>
        { rightPage }
      </Switcher>

      <Switcher disabled={rightPage + 1 > total}
                href={pagePath(rightPage + 1)}>
        { '>' }
      </Switcher>
    </Container>
  );
}

const Switcher = ({ disabled, href, isCurrent, children }) => {
  return (
    <>
      { disabled
        ? <StyledLink as="span" data-disabled> { children } </StyledLink>
        : (
          <Link href={href} passHref scroll={false}>
            <StyledLink isCurrent={isCurrent}> { children } </StyledLink>
          </Link>
        ) }
    </>
  );
};

const Container = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;

& > :first-child {
  margin-right: 24px;
}
`;

const StyledLink = styled.a`
padding: 5px;
min-width: 30px;
text-align: center;

background: ${p => p.isCurrent ? 'fixed' : 'gray'};

&:hover:not([data-disabled]) {
  background: darkgray;
  cursor: pointer;
}

&[data-disabled] {
  opacity: 0.5;
}
`;
