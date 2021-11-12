import Link from "next/link";
import styles from './Nav.module.css';
import { useRouter } from "next/router";

export function Nav() {
  return (
    <nav className={styles.nav} id="nav" title="Navigation bar">
      <Route route="/" text="Home" />
      <Route route="/posts" text="blog" />
    </nav>
  );
}

function Route({ route, text }: { route: string; text: string }) {
  const router = useRouter();

  return (
    <Link href={route}>
      <a id={text} className={router.pathname === route ? styles.active : ''}>{text}</a>
    </Link>
  );
}
