import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <Link href="/cypress/about">
        <a>About</a>
      </Link>
    </nav>
  );
}
