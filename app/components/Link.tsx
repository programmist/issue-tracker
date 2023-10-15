"use client";

import { Link as RadixLink } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}
const Link = ({ href, children }: Props) => {
  const router = useRouter();
  const go = () => {
    router.push(href);
  };
  return <RadixLink onClick={go}>{children}</RadixLink>;
};

export default Link;
