import { fetchExchangeRates } from "../exchange-rates-services";

export default async function ExchangeRatesViewServer() {
  const data = await fetchExchangeRates();

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
