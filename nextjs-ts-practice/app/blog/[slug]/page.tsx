import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: keyof typeof titles };
};

const titles = {
  "1": "first",
  "2": "second",
  "3": "third",
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const description = (await parent).description ?? "This is blog page";
  return {
    title: `${titles[params.slug]} post`,
    description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
