import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ArrowSvg from '@/icons/arrow.svg';
import { useOnClickOutside } from '@/utils';

export default function Dropdown({ list = [], onSelect, selectedItem, placeholder = '', zIndex }) {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  useOnClickOutside(ref, () => setIsExpanded(false));

  const handleSelect = item => {
    setIsExpanded(false);
    onSelect?.(item);
  };

  return (
    <Container ref={ref} zIndex={zIndex}>
      <Header isExpanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}>
        <Value isExpanded={isExpanded}>
          { selectedItem ? selectedItem.text : placeholder }
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
const Container = styled.section`
min-width: 0;
position: relative;
width: 100%;

${({ zIndex }) => zIndex && `
z-index: ${zIndex};
`}
`;

const Header = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
border: 1px solid;
padding: 5px 5px 5px 7.5px;
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

const Value = styled.section`
overflow: hidden;
text-overflow: ellipsis;
`;

const Arrow = styled.section`
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
border: 1px solid;
color: ${p => p.theme.fontColor};
border-bottom-left-radius: ${borderRadius};
border-bottom-right-radius: ${borderRadius};
overflow-y: auto;
font-size: ${fontSize};
position: absolute;
background-color: ${p => p.theme.bgColor};
width: 100%;
max-height: 500px;

&::-webkit-scrollbar {
  width: 5px;
}
`;

const ListItem = styled.li`
cursor: pointer;
user-select: none;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 0 2.5px;
padding-top: 8px;

&:hover {
  background-color: #FFFFFF50;
}
`;
