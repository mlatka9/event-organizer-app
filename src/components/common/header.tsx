import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./button";
import Image from "next/image";
import { useState } from "react";
import HeaderDropdown from "./header-dropdown";
import CaretIcon from "@components/icons/caret";
import clsx from "clsx";
import Link from "next/link";

const Header = () => {
  const { data: sessionData } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropDownOpen = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative flex items-center justify-between bg-white px-5 py-3 shadow-md">
      <Link href="/">
        <a>
          <h1 className="text-xl font-semibold italic text-blue-900">
            Event Organizer
          </h1>
        </a>
      </Link>
      {sessionData ? (
        <div
          className="flex cursor-pointer items-center"
          onClick={toggleDropDownOpen}
        >
          <div className="mr-3 font-semibold">
            {sessionData.user?.name || sessionData.user?.email}
          </div>
          <Image
            src={sessionData.user?.image || "/icons/avatar-fallback.svg"}
            className="block rounded-full"
            width="40"
            height="40"
          />
          <div
            className={clsx(
              "transition-transform",
              isDropdownOpen && "rotate-180"
            )}
          >
            <CaretIcon />
          </div>
        </div>
      ) : (
        <Button onClick={sessionData ? () => signOut() : () => signIn()}>
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
      )}
      {isDropdownOpen && <HeaderDropdown />}
    </div>
  );
};

export default Header;
