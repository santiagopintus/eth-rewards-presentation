import s from "@styles/hero.module.scss";
import logo from "@images/eth-logo.svg";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className={s.heroContainer}>
      <div className="container">
        <Link href={"/"} className={s.logoContainer}>
          <Image
            className={s.logo}
            src={logo.src}
            alt="EthRewards Logo"
            width={324}
            height={62}
          />
        </Link>
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
