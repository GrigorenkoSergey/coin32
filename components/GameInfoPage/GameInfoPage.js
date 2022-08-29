import Slider from './Slider';
import Layout from '@/components/Layout';

export default function GameInfoPage({ slug, info, }) {
  const { name, description } = info;

  return (
    <Layout title={name}>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <Slider slug={slug} />
    </Layout>
  );
}
