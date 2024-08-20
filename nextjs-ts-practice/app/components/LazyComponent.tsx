"use client";

import React from "react";

export default async function LazyComponent() {
  async function fetchData() {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("Data fetched after delay!");
      }, 3000);
    });
  }

  const data = await fetchData();

  return <div>{data}</div>;
}
