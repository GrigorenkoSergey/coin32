import styled from 'styled-components';

export default function Pagination({ className, curr, total, onSelect }) {
  let [leftPage, centerPage, rightPage] = [1, 2, 3];
  if (curr > 1) [leftPage, centerPage, rightPage] = [curr - 1, curr, curr + 1];
  if (curr === total) [leftPage, centerPage, rightPage] = [curr - 2, curr - 1, curr];

  return (
    <Container className={className}>
      <Switcher disabled={leftPage < 3}
                onClick={() => onSelect(1)}>
        { '<<' }
      </Switcher>

      <Switcher disabled={leftPage < 2}
                onClick={() => onSelect(leftPage - 1)}>
        { '<' }
      </Switcher>

      <Switcher onClick={() => onSelect(leftPage)}
                isCurrent={leftPage === curr}>
        { leftPage }
      </Switcher>

      <Switcher onClick={() => onSelect(centerPage)}
                disabled={centerPage > total}
                isCurrent={centerPage === curr}>
        { centerPage }
      </Switcher>

      <Switcher onClick={() => onSelect(rightPage)}
                disabled={rightPage > total}
                isCurrent={rightPage === curr}>
        { rightPage }
      </Switcher>

      <Switcher disabled={rightPage + 1 > total}
                onClick={() => onSelect(rightPage + 1)}>
        { '>' }
      </Switcher>

      <Switcher disabled={rightPage + 2 > total}
                onClick={() => onSelect(total)}>
        { '>>' }
      </Switcher>
    </Container>
  );
}

const Container = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;
`;

const Switcher = styled.button.attrs(p => ({ type: 'button' }))`
all: unset;
padding: 5px;
min-width: 30px;
text-align: center;

background: ${p => p.isCurrent ? 'fixed' : 'gray'};

&:hover:not(:disabled) {
  background: darkgray;
  cursor: pointer;
}

&:disabled {
  opacity: 0.5;
}
`;
