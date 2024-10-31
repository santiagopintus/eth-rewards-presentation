import Chart from "@src/components/Charts";
import DateSelection from "@src/components/DateSelection";
import Hero from "@src/components/Hero";
import Loading from "@src/components/Loading";
import {
  getISODate,
  getServerSideBlocks,
  getDateDaysAgo,
} from "@src/utils/Utils";

const Home = async () => {
  const blocks = await getServerSideBlocks(
    getDateDaysAgo(30).toISOString(),
    getISODate()
  );

  return (
    <main>
      <Hero />
      <DateSelection />
      {blocks ? <Chart data={blocks} /> : <Loading />}
    </main>
  );
};

export default Home;
