import type { Metadata } from "next";
import { getContent } from "@/lib/loadContent";

type Props = {
  params: { slug: keyof typeof titles };
};

const titles = {
  "1": "first",
  "2": "second",
  "3": "third",
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  try {
    const { frontmatter } = await getContent(params.slug);
    return frontmatter;
  } catch (e) {
    console.log("error:", e);
  }

  // const description = (await parent).description ?? "This is blog page";

  // return {
  //   title: `${titles[params.slug]} post`,
  //   description,
  // };
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const { content } = await getContent(params.slug);
    return content;
  } catch (e) {
    console.log("error:", e);
  }

  // return <div>My Post: {params.slug}</div>;
}
