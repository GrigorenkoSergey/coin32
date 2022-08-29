import styled from 'styled-components';
import Slider from './Slider';
import Layout from '@/components/Layout';

export default function GameInfoPage({ slug, info, }) {
  const { name, description, website, rating, released, platforms } = info;

  return (
    <Layout title={name}>
      <MetaInfo>
        <h3>Website:</h3>
        { !website && <span>No website</span> }
        { website && <a href={website} rel="noopener noreferrer" target="_blank"> { website }</a> }

        <h3>Rating:</h3>
        <span>{ rating || 'No rating' }</span>

        <h3>Released:</h3>
        <span>{ released || 'No data' }</span>

        <h3>Platforms:</h3>
        <Platforms>
          { platforms.map((p, i) => p.platform.name + (i < platforms.length - 1 ? ', ' : '')) }
        </Platforms>
      </MetaInfo>

      <h3>Description:</h3>

      <Description dangerouslySetInnerHTML={{ __html: description }} />

      <h3>Game screenshots:</h3>

      <StyledSlider slug={slug} />
    </Layout>
  );
}

const MetaInfo = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-gap: 10px 10px;
margin: 6px 0;
align-items: center;

@media ${p => p.theme.media.laptop} {
  grid-template-columns: repeat(2, auto 1fr);
  grid-column-gap: 10%;
}

& >:nth-child(2n) {
  justify-self: end;
  padding: 4px;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}

a: hover {
  text-shadow: 2px 2px 8px white, -2px -2px 8px white;
}

h3 {
  margin: 0;
}
`;

const Platforms = styled.p`
margin: 0;
text-align: end;
`;

const Description = styled.section`
margin: 0;

& > :first-child {
  margin-top: 0;
  padding-top: 0;
}

& > :last-child {
  margin-bottom: 0;
  padding-bottom: 0;
}
`;

const StyledSlider = styled(Slider)`
margin-top: 12px;
`;
