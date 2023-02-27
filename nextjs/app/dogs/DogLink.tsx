"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

// This *client* component will be imported into a blog layout
export default function DogLink({
  slug,
  className,
  activeClassName,
  children,
}: {
  slug: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}) {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link
      href={`/dogs/${slug}`}
      className={[className, isActive && activeClassName]
        .filter(Boolean)
        .join(" ")}
      aria-current={isActive}
    >
      {children}
    </Link>
  );
}
