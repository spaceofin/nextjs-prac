export default function ProductsPage({
  params,
}: {
  params: {
    categoryId: string;
    itemId: string;
  };
}) {
  const { categoryId, itemId } = params;
  return (
    <div>
      <div>Category: {categoryId}</div>
      <div>Item: {itemId}</div>
    </div>
  );
}
