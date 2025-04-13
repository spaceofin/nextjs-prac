import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <div className="flex items-center px-5 bg-gray-300 h-12 rounded-sm text-xl gap-5">
      <Link href="/" className="bg-gray-400 bg-opacity-70 rounded-md px-5">
        HOME
      </Link>
      <Link
        href="/exchange-rates-client"
        className="bg-gray-400 bg-opacity-70 rounded-md px-5">
        EXCHANGE RATES - CLIENT COMPONENT
      </Link>
      <Link
        href="/exchange-rates-server"
        className="bg-gray-400 bg-opacity-70 rounded-md px-5">
        EXCHANGE RATES - SERVER COMPONENT
      </Link>
    </div>
  );
}
