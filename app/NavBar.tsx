"use client";
import { Skeleton } from "@/app/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSpottedBug } from "react-icons/gi";

const NavBar = () => {
  return (
    <nav className="mb-5 border-b px-5 py-3">
      <Container size="3">
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiSpottedBug
                size={30}
                className="transition-fill duration-300 hover:rotate-45 hover:fill-red-600"
              />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const path = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": path === link.href,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const skelProps = {
    width: "2rem",
    height: "2rem",
    circle: true,
    className: "flex items-center",
  };

  if (status === "loading") return <Skeleton {...skelProps} />;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="3">{session!.user!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
