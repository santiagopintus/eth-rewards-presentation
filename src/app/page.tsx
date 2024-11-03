import ChartContainer from "@src/components/ChartContainer";
import DateSelection from "@src/components/DateSelection";
import Hero from "@src/components/Hero";
import Loading from "@src/components/Loading";
import { getServerSideBlocks, getDateDaysAgo } from "@src/utils/Utils";

const Home = async () => {
  // const blocks = await getServerSideBlocks(
  //   getDateDaysAgo(30).toISOString(),
  //   new Date().toISOString()
  // );

  return (
    <main>
      <Hero />
      <div className="container">
        <DateSelection />
        <ChartContainer data={[]} />
      </div>
    </main>
  );
};

export default Home;
