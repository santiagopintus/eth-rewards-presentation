import s from "@styles/hero.module.scss";
import logo from "@images/eth-logo.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={s.heroContainer}>
      <div className="container">
        <div className={s.logoContainer}>
          <Image
            className={s.logo}
            src={logo.src}
            alt="EthRewards Logo"
            width={324}
            height={62}
          />
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
