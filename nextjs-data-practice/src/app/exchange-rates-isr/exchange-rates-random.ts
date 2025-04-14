import { ExchangeRatesData } from "../exchange-rates-server/exchange-rates-services";

export async function fetchRandomExchangeRate() {
  try {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.NEXT_PUBLIC_EXCHANGE_RATE_APP_ID}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disclaimer, license, ...rest } = await response.json();
    const data = rest as ExchangeRatesData;

    const randomedRates: Record<string, number> = Object.fromEntries(
      Object.entries(data.rates).map(([currency, rate]) => {
        const randomAdjustment = 0.9 + Math.random() * 0.2;
        const adjustedRate = rate * randomAdjustment;
        return [currency, adjustedRate];
      })
    );

    return {
      ...data,
      rates: randomedRates,
    };
  } catch (error) {
    console.error("Error occured while data fetching:", error);
    return null;
  }
}
