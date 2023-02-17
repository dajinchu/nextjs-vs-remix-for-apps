import { generateList } from "@/lib/dogApi";
import Link from "next/link";
import Dog from './dog'
import styles from './layout.module.css'

export default async function DogsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dogIds = await generateList();
  return (
    <div className={styles.container}>
      <main>
        {dogIds.map((id) => (
          <Link href={`/dogs/${id}`}>
            {/* @ts-expect-error Server Component */}
            <Dog id={id} />
          </Link>
        ))}
      </main>
      <section>
        {children}
      </section>
    </div>
  );
}
