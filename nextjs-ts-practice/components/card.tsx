import React from "react";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 px-6 bg-cyan-100 rounded bg-opacity-70 ${className}`}>
      {children}
    </div>
  );
}
