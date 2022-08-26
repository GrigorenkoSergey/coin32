import Dropdown from '../components/Dropdown';
import Layout from '../components/Layout';
import Search from '../components/Search';
import SwapSvg from '../public/icons/swap.svg';

export default function Home() {
  return (
    <Layout title="Select your Game!">
      <Dropdown />
      <Search />
      <SwapSvg width={22} />
    </Layout>
  );
}
