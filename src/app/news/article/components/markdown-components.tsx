import React from "react";
import Link from "next/link";
import ImmediateRelease from "@/app/components/announcement/for-immediate-release";
import {
  Tweet1897358998472712481,
  Tweet1897359749236322590,
  Tweet1897408292621529254,
  Tweet1896064504217420154,
  Tweet1896072159107449332,
  Tweet1897496107208597898,
  Tweet1897364097542578217,
  Tweet1898834551826227249,
  Tweet1899546714740048029,
  Tweet1901626548081271292,
  Tweet1904593406178828671,
  Tweet1910471294291787879,
} from "@/app/components/providers/feed/twitter-feed";
import {
  Srh1,
  Api1,
  Api2,
  Cgu1,
  Tpcsg1,
  Tpcsg2,
} from "@/app/components/providers/feed/img-feed";

interface CustomSectionProps {
  className?: string;
  children?: React.ReactNode;
}

const componentMap: Record<string, React.FC<CustomSectionProps>> = {
  "latest-release": () => (
    <div className="py-6 mb-6 border-y border-dark/10 dark:border-light/10">
      <ImmediateRelease />
    </div>
  ),

  srh1: () => <Srh1 />,
  api1: () => <Api1 />,
  api2: () => <Api2 />,
  cgu1: () => <Cgu1 />,
  tpcsg1: () => <Tpcsg1 />,
  tpcsg2: () => <Tpcsg2 />,

  tweet1897358998472712481: () => <Tweet1897358998472712481 />,
  tweet1897359749236322590: () => <Tweet1897359749236322590 />,
  tweet1897408292621529254: () => <Tweet1897408292621529254 />,
  tweet1896064504217420154: () => <Tweet1896064504217420154 />,
  tweet1896072159107449332: () => <Tweet1896072159107449332 />,
  tweet1897496107208597898: () => <Tweet1897496107208597898 />,
  tweet1897364097542578217: () => <Tweet1897364097542578217 />,
  tweet1898834551826227249: () => <Tweet1898834551826227249 />,
  tweet1899546714740048029: () => <Tweet1899546714740048029 />,
  tweet1901626548081271292: () => <Tweet1901626548081271292 />,
  tweet1904593406178828671: () => <Tweet1904593406178828671 />,
  tweet1910471294291787879: () => <Tweet1910471294291787879 />,
};

const CustomSection: React.FC<CustomSectionProps> = ({
  className,
  children,
}) => {
  if (className && componentMap[className]) {
    const Component = componentMap[className];
    return <Component />;
  }

  return <section className={className}>{children}</section>;
};

export const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <Link href={href ?? "#"} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  section: CustomSection,
};
