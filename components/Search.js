import styled from 'styled-components';

export default function Search() {
  return (
    <Input type="text" alt="search" />
  );
}

const Input = styled.input`
  border-radius: 10000px;
  border: 1px solid black;
  outline: none;
  padding: 5px 35px 5px 10px;
  font-size: 14px;
  background-image: url('/icons/search.svg');
  background-repeat: no-repeat;
  background-position: center right 10px;
  background-size: 20px;

  &:focus {
    box-shadow: 0 0 5px gray;
  }
`
