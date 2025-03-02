import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams: { error: boolean };
}) {
  if (searchParams.error) {
    throw new Error("FAQ Page error Oops!");
  }
  return (
    <div className="flex flex-col text-2xl gap-1">
      <span className="z-10">Hello,</span>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:z-[-1] after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-32 md:w-48 lg:w-64 xl:w-80 2xl:x-96"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </div>
  );
}
