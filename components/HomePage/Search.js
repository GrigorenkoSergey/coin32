import styled from 'styled-components';
import SearchSvg from '@/icons/search.svg';

export default function Search({ className }) {
  return (
    <Container className={className}>
      <Input type="text" alt="search" placeholder="search by name" />
      <SearchSvg width={20} />
    </Container>
  );
}

const bgColor = '#FFFFFF29';

const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: ${bgColor};
border-radius: 10000px;
border: 1px solid;
position: relative;

&:focus-within,
&:hover {
  svg {
    stroke: black;
    fill: black;
  }
}

svg {
  stroke: white;
  fill: white;
  position: absolute;
  right: 10px;
}
`;

const Input = styled.input`
  outline: none;
  padding: 5px 35px 5px 10px;
  font-size: ${p => p.theme.fontSize};
  transition: all 0.5s;
  background: transparent;
  border:none;
  flex-grow: 1;
  border-radius: inherit;
  color: white;

  &::placeholder {
    color: #FFFFFF;
  }

  &:focus::placeholder,
  &:hover::placeholder {
    color: gray;
  }

  &:hover, 
  &:focus {
    background-color: #FFF;
    box-shadow: 0 0 10px 3px white;
    color: black;
  }
`;
