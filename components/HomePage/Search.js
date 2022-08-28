import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import SearchSvg from '@/icons/search.svg';

export default function Search({ className, onEnter }) {
  const [value, setValue] = useState('');
  const ref = useRef();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Enter') return ref.current.blur();
    };

    ref.current.addEventListener('keydown', handleKeyDown);
    return () => ref.current.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Container className={className}>
      <Input type="text"
             ref={ref}
             alt="search"
             placeholder="search by name"
             value={value}
             onChange={e => setValue(e.target.value)}
             onBlur={() => onEnter(value)} />
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
  cursor: pointer;
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
    color: black;
  }

  &:focus {
    box-shadow: 0 0 10px 3px white;
  }
`;
