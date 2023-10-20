"use client";
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
    <nav className="mb-5 border-b px-5 py-3">
      <Container size="3">
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
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
                    className={classnames(
                      "transition-colors hover:text-zinc-800",
                      {
                        "text-zinc-900": path === link.href,
                        "text-zinc-500": path !== link.href,
                      },
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && <Spinner />}
            {status === "authenticated" && (
              <AuthStatusMenu
                email={session.user!.email!}
                image={session.user!.image!}
              />
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatusMenu = ({ email, image }: { email: string; image: string }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="3">{email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Logout</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
