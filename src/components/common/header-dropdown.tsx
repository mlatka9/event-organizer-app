import { signOut } from "next-auth/react";
import Link from "next/link";

const HeaderDropdown = () => {
  return (
    <ul className="absolute top-[calc(100%+5px)] right-2 w-40 rounded-md bg-white shadow-md">
      <li>
        <Link href={"/events"}>
          <a className="flex w-full rounded-md px-5 py-3 hover:text-gray-600">
            Events
          </a>
        </Link>
      </li>
      <li>
        <Link href={"/groups"}>
          <a className="flex w-full rounded-md px-5 py-3 hover:text-gray-600">
            Groups
          </a>
        </Link>
      </li>
      <li>
        <button
          onClick={() => signOut()}
          className="flex w-full rounded-md px-5 py-3 hover:text-gray-600 "
        >
          sign out
        </button>
      </li>
    </ul>
  );
};

export default HeaderDropdown;
