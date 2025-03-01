export interface ExchangeRateData {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export async function fetchExchangeRates(): Promise<ExchangeRateData | null> {
  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_RATE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error occured while data fetching:", error);
    return null;
  }
}
