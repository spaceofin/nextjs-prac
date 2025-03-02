export interface ExchangeRatesResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export type ExchangeRatesData = Omit<
  ExchangeRatesResponse,
  "disclaimer" | "license"
>;

export async function fetchExchangeRates(): Promise<ExchangeRatesData | null> {
  try {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.EXCHANGE_RATE_APP_ID}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const { disclaimer, license, ...data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error occured while data fetching:", error);
    return null;
  }
}
