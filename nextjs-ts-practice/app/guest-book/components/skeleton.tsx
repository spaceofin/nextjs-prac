import Card from "@/components/card";

export default function Skeleton() {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <Card
          key={index}
          className="flex flex-col justify-center min-w-72 h-36 animate-pulse-skeleton"
        />
      ))}
    </>
  );
}
