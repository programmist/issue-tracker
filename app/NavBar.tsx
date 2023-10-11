import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { GiSpottedBug } from "react-icons/gi";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <GiSpottedBug size={30} className="fill-red-600 hover:scale-125" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-zinc-500 transition-colors hover:text-zinc-800"
              href={link.href}
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
