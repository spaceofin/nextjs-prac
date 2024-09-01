import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

export default function ProductsPage({
  params,
}: {
  params: {
    categoryId: string;
    itemNumber: string;
  };
}) {
  const { categoryId, itemNumber } = params;
  const parsedItemNumber = parseInt(itemNumber, 10);

  console.log("params:", params);
  console.log("parsedItemNumber:", parsedItemNumber);

  if (isNaN(parsedItemNumber)) {
    notFound();
  }

  return (
    <div>
      <MDXRemote
        source={`### PRODUCT INFO`}
        components={useMDXComponents({})}
      />
      <div>Category: {categoryId}</div>
      <div>ItemNumber: {itemNumber}</div>
    </div>
  );
}
