import { delay } from "@/app/utils/delay";

export default async function CurrencyCard({
  currency,
  rate,
  delayMs,
}: {
  currency: string;
  rate: number;
  delayMs?: number;
}) {
  if (delayMs) await delay(delayMs);

  return (
    <div key={currency} className="flex gap-2 my-0.5">
      <span className="inline-block text-center rounded-sm w-10 bg-red-300">
        {currency}
      </span>
      <span>{rate}</span>
    </div>
  );
}
