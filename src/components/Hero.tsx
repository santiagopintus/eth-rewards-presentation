import s from "@styles/hero.module.scss";
import logo from "@images/eth-logo.svg";

const Hero = () => {
  return (
    <div className={s.heroContainer}>
      <div className="container">
        <div className={s.logoContainer}>
          <img className={s.logo} src={logo.src} alt="EtherRewards Logo" />
        </div>
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
