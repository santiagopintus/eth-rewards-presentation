import BlocksRender from "@src/components/BlocksRender";
import DateSelection from "@src/components/DateSelection";
import Hero from "@src/components/Hero";
import Loading from "@src/components/loading";
import { getServerSideBlocks } from "@src/utils/Utils";

const Home = async () => {
  const blocks = await getServerSideBlocks();

  return (
    <main>
      <Hero />
      <DateSelection />
      {blocks ? <BlocksRender blocks={blocks} /> : <Loading />}
    </main>
  );
};

export default Home;
