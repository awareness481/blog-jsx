import Link from "next/link";
import styles from './Nav.module.css';
import { useRouter } from "next/router";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Route route="/" text="Home" />
      <Route route="/posts" text="blog" />
    </nav>
  );
}

function Route({ route, text }: { route: string; text: string }) {
  const router = useRouter();

  return (
    <Link href={route}>
      <a className={router.pathname === route ? styles.active : ''}>{text}</a>
    </Link>
  );
}
