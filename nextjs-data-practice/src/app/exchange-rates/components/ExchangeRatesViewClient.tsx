"use client";
import React, { useState, useEffect } from "react";
import { ExchangeRatesData } from "../exchange-rates-services";

export default function ExchangeRatesViewClient() {
  const [data, setData] = useState<ExchangeRatesData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://openexchangerates.org/api/latest.json?app_id=${process.env.NEXT_PUBLIC_EXCHANGE_RATE_APP_ID}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { disclaimer, license, ...data } = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error occured while data fetching:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <div className="mx-10 my-5 bg-amber-200 px-5 py-5 rounded-md">
          <h1 className="font-bold text-lg my-2 bg-blue-300 rounded-sm px-3">
            EXCHANGE RATES
          </h1>
          <div className="mt-2 italic font-bold px-2">BASE: {data?.base}</div>
          <div className="text-sm px-2">
            {Object.entries(data.rates)?.map(([currency, rate]) => (
              <div key={currency} className="flex gap-2 my-0.5">
                <span className="inline-block text-center rounded-sm w-10 bg-red-300">
                  {currency}
                </span>
                <span>{rate}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
