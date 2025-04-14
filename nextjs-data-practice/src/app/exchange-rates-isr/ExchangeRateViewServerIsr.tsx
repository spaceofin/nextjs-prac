import CurrencyCard from "../components/CurrencyCard";
import { fetchRandomExchangeRate } from "./exchange-rates-random";

export default async function ExchangeRatesViewServer() {
  const data = await fetchRandomExchangeRate();

  return (
    <>
      {data ? (
        <div className="bg-amber-200 px-5 py-5 rounded-md">
          <h1 className="font-bold text-lg my-2 bg-blue-300 rounded-sm px-3">
            EXCHANGE RATES
          </h1>
          <div className="mt-2 italic font-bold px-2">BASE: {data?.base}</div>
          <div className="text-sm px-2">
            {Object.entries(data.rates)?.map(([currency, rate]) => (
              <CurrencyCard key={currency} currency={currency} rate={rate} />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-5 text-xl">Loading...</div>
      )}
    </>
  );
}
