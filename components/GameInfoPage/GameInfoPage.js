import styled from 'styled-components';
import Slider from './Slider';
import Layout from '@/components/Layout';

export default function GameInfoPage({ slug, info, }) {
  const { name, description, website, rating, released, platforms } = info;

  return (
    <Layout title={name}>
      <MetaInfo>
        <h3>Website</h3>
        <a href={website || ''} rel="noopener noreferrer" target="_blank">
          { website || 'No website' }
        </a>
      </MetaInfo>

      <MetaInfo>
        <h3>Rating:</h3>
        <span>{ rating }</span>
      </MetaInfo>

      <MetaInfo>
        <h3>Released:</h3>
        <span>{ released }</span>
      </MetaInfo>

      <MetaInfo>
        <h3>Platforms:</h3>
        <Platforms>{
          platforms.map((p, i) => p.platform.name + (i < platforms.length - 1 ? ', ' : ''))
        }</Platforms>
      </MetaInfo>

      <MetaInfo>
        <h3>Description:</h3>
      </MetaInfo>

      <Description dangerouslySetInnerHTML={{ __html: description }} />

      <MetaInfo>
        <h3>Game screenshots:</h3>
      </MetaInfo>

      <StyledSlider slug={slug} />
    </Layout>
  );
}

const MetaInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 6px 0;

a {
  max-width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 4px;
}

a: hover {
  text-shadow: 2px 2px 8px white, -2px -2px 8px white;
}

h3 {
  margin: 0;
}
`;

const Platforms = styled.p`
margin: 0 0 0 16px;
text-align: end;
`;

const Description = styled.section`
padding: 12px 0;

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
