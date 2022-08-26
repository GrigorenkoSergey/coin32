import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../utils';
import ArrowSvg from '../public/icons/arrow.svg';

export default function Dropdown(x) {
  const { list = [], onSelect, selectedItem } = x;

  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  useOnClickOutside(ref, () => setIsExpanded(false));

  const handleSelect = item => {
    setIsExpanded(false);
    onSelect?.(item);
  };

  return (
    <Container ref={ref}>
      <Header isExpanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}>
        <Value isExpanded={isExpanded}>
          { selectedItem ? selectedItem.text : x.placeholder }
        </Value>

        <Arrow isExpanded={isExpanded}>
          <ArrowSvg width={16} />
        </Arrow>
      </Header>

      { isExpanded && (
        <List>
          { list.length === 0
            ? <ListItem>Нет данных...</ListItem>
            : list.map(item => (
              <ListItem key={item.id}
                        onClick={() => handleSelect(item)}>{ item.text }
              </ListItem>
            )) }
        </List>
      ) }
    </Container>
  );
}

const fontSize = '14px';
const transitionDuration = '0.3s';
const borderRadius = '6px';

/* https://stackoverflow.com/questions/38223879/white-space-nowrap-breaks-flexbox-layout */
const Container = styled.div`
min-width: 0;
position: relative;
`;

const Header = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
border: 1px solid black;
padding: 5px 5px 5px 2.5px;
font-size: ${fontSize};
border-radius: ${borderRadius};
cursor: pointer;
user-select: none;

${x => x.isExpanded && `
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: transparent;
`}
`;

const Value = styled.div`
overflow: hidden;
text-overflow: ellipsis;
`;

const Arrow = styled.div`
cursor: pointer;
transition: ${transitionDuration};

${x => x.isExpanded && `
  transform: rotate(180deg);
`}
`;

const List = styled.ul`
margin: 0;
list-style-type: none;
padding: 5px;
border: 1px solid black;
border-bottom-left-radius: ${borderRadius};
border-bottom-right-radius: ${borderRadius};
overflow-y: auto;
font-size: ${fontSize};
background-color: #fff;
position: absolute;
width: 100%;
`;

const ListItem = styled.li`
cursor: pointer;
user-select: none;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 0 2.5px;

&:hover {
  background-color: #00000010;
}
`;
