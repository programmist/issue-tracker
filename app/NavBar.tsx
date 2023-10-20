"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSpottedBug } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";
import { Spinner } from "./components";

const NavBar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();
  console.log(status, session);
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center gap-6 border-b px-5">
      <Link href="/">
        <GiSpottedBug
          size={30}
          className="transition-fill duration-300 hover:rotate-45 hover:fill-red-600 "
        />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames("transition-colors hover:text-zinc-800", {
                "text-zinc-900": path === link.href,
                "text-zinc-500": path !== link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box className="ml-auto">
        {status === "loading" && <Spinner />}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
