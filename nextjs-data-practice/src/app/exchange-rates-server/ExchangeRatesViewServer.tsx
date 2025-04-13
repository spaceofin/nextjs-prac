import { fetchExchangeRates } from "./exchange-rates-services";
import CurrencyCard from "../components/CurrencyCard";
import { Suspense } from "react";

export default async function ExchangeRatesViewServer() {
  const data = await fetchExchangeRates();

  return (
    <>
      {data ? (
        <div className="bg-amber-200 px-5 py-5 rounded-md">
          <h1 className="font-bold text-lg my-2 bg-blue-300 rounded-sm px-3">
            EXCHANGE RATES
          </h1>
          <div className="mt-2 italic font-bold px-2">BASE: {data?.base}</div>
          <div className="text-sm px-2">
            {Object.entries(data.rates)?.map(([currency, rate], index) => (
              <Suspense key={currency} fallback={<div>...</div>}>
                <CurrencyCard
                  currency={currency}
                  rate={rate}
                  delayMs={index * 1000}
                />
              </Suspense>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-5 text-xl">Loading...</div>
      )}
    </>
  );
}
