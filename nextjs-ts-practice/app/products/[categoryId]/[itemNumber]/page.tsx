import { notFound } from "next/navigation";

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
      <div>Category: {categoryId}</div>
      <div>ItemNumber: {itemNumber}</div>
    </div>
  );
}
