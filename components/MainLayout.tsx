import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/MainLayout.module.scss";
import cn from "classnames";
import { IMainLayoutProps } from "../types";
import LogoIcon from "./icons/LogoIcon";

export default function MainLayout({ children }: IMainLayoutProps) {
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  return (
    <div className={styles["page-wrapper"]}>
      <Head>
        <title>Каталог фотокарточек</title>
      </Head>

      <div className={styles["orb-left"]} />
      <div className={styles["orb-right"]} />
      <div className={styles["pattern-bg"]} />

      <header className={styles["header"]}>
        <div className={styles["header__border-glow"]} />

        <div className={styles["header__content"]}>
          <Link href="/" className={styles["header__logo"]}>
            <LogoIcon className={styles["header__logo-icon"]} gradientId="headerLogoGradient" />
            <span className={styles["header__logo-text"]}>ХардФорвард</span>
          </Link>

          <nav className={styles["header__nav"]}>
            <Link
              className={cn(styles["header__link"], {
                [styles["header__link_active"]]: isActive("/"),
              })}
              href="/"
            >
              <span>Главная</span>
            </Link>
            <Link
              className={cn(styles["header__link"], {
                [styles["header__link_active"]]: isActive("/products"),
              })}
              href="/products"
            >
              <span>Фотокарточки</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles["main-content"]}>{children}</main>

      <footer className={styles["footer"]}>
        <div className={styles["footer__border-glow"]} />

        <div className={styles["footer__content"]}>
          <Link href="/" className={styles["footer__logo"]}>
            <LogoIcon className={styles["footer__logo-icon"]} gradientId="footerLogoGradient" />
            <span className={styles["footer__logo-text"]}>ХардФорвард</span>
          </Link>
          <span className={styles["footer__copyright"]}>© 2025. Все права защищены.</span>
        </div>
      </footer>
    </div>
  );
}
