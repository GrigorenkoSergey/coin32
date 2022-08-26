import styled from 'styled-components';

export default function Footer(x) {
  return <Content {...x}>Created by EvilEngeneer</Content>;
}

const Content = styled.footer`
display: flex;
justify-content: center;
padding: 5px;
margin-top: auto;
`;
