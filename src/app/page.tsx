import ChartContainer from "@src/components/ChartContainer";
import DateSelection from "@src/components/DateSelection";
import Hero from "@src/components/Hero";

const Home = async () => {
  return (
    <main>
      <Hero />
      <div className="container">
        <DateSelection />
        <ChartContainer />
      </div>
    </main>
  );
};

export default Home;
