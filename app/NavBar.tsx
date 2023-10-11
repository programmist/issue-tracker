"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSpottedBug } from "react-icons/gi";

const NavBar = () => {
  const path = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <GiSpottedBug
          size={30}
          className="fill-red-600 transition-transform hover:rotate-45"
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
    </nav>
  );
};

export default NavBar;
