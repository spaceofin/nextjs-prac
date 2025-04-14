import ExchangeRateViewServerIsr from "./ExchangeRateViewServerIsr";

export const revalidate = 10;

export default function ExchangeRatesCSRPage() {
  return (
    <div>
      <ExchangeRateViewServerIsr />
    </div>
  );
}
