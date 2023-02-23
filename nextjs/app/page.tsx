import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <main className={styles.main}>
      <Link href="/dogs">CHeck out dogs</Link>
    </main>
  );
}

export const revalidate = 0;
