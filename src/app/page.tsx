import Chart from "@src/components/Charts";
import DateSelection from "@src/components/DateSelection";
import Hero from "@src/components/Hero";
import Loading from "@src/components/Loading";
import { getServerSideBlocks } from "@src/utils/Utils";

const Home = async () => {
  const blocks = await getServerSideBlocks();

  return (
    <main>
      <Hero />
      <DateSelection />
      {blocks ? <Chart data={blocks} /> : <Loading />}
    </main>
  );
};

export default Home;
