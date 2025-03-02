import { fetchExchangeRates } from "./exchange-rate-services";

export default async function ExchangeRate() {
  const data = await fetchExchangeRates();
  const rates = data?.rates && Object.entries(data.rates);

  return (
    <div>
      <div>BASE: {data?.base}</div>
      <div>
        {rates &&
          rates?.map(([currency, rate]) => (
            <div key={currency}>
              <span>{currency}</span>
              <span>: </span>
              <span>{rate}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
