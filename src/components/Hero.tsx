import s from "@styles/hero.module.scss";

const Hero = () => {
  return (
    <div className={s.heroContainer}>
      <div className="container">
        <h1>EtherRewards</h1>
        <p>
          Sigue las recompensas de bloques de Ethereum en USD a lo largo del
          tiempo. Gráficos interactivos y análisis de tendencias al alcance de
          tu mano.
        </p>
      </div>
    </div>
  );
};

export default Hero;
