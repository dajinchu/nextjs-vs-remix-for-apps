import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { generateList } from "@/lib/dogApi";
import Dog from "./dog";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const dogIds = await generateList();
  return (
    <main className={styles.main}>
      {dogIds.map((id) => (
        <>
          {/* @ts-expect-error Server Component */}
          <Dog id={id} />
        </>
      ))}
    </main>
  );
}

export const revalidate = 0;
