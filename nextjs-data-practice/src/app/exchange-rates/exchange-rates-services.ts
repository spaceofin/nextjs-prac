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
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.NEXT_PUBLIC_EXCHANGE_RATE_APP_ID}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disclaimer, license, ...data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error occured while data fetching:", error);
    return null;
  }
}
