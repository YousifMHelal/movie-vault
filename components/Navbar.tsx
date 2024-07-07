"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [word, setWord] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (word) {
      params.set("search", word);
    } else {
      params.delete("search");
    }

    router.push(`${window.location.pathname}?${params.toString()}`, undefined);
  }, [word, router]);

  return (
    <nav className="flex justify-between items-center h-20 px-5 md:px-10">
      <Link href="/" className="flex gap-4 items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="red-gradient text-4xl font-bold hidden md:block">
          Movie Vault
        </span>
      </Link>
      <div className="flex bg-white p-2 rounded-xl w-64 md:w-80">
        <Image src="/search.svg" alt="search" width={22} height={22} />
        <input
          type="search"
          placeholder="Search for movies"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-black placeholder:text-black px-2"
        />
      </div>
    </nav>
  );
};

export default Navbar;
