import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <div className="flex items-center px-5 bg-gray-300 h-12 rounded-sm mx-10 my-5 text-xl gap-5">
      <Link href="/" className="bg-gray-400 bg-opacity-70 rounded-md px-5">
        HOME
      </Link>
      <Link
        href="/exchange-rates"
        className="bg-gray-400 bg-opacity-70 rounded-md px-5">
        EXCHANGE RATES
      </Link>
    </div>
  );
}
