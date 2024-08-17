export default function ShopPage({ params }: { params: { slug?: string[] } }) {
  const { slug } = params;

  if (!slug) {
    return <div>This is Shop Page</div>;
  }

  if (slug.length === 1) {
    return <div>First level: {slug[0]}</div>;
  }

  if (slug.length === 2) {
    return (
      <div>
        <div>First level: {slug[0]}</div>
        <div>Second level: {slug[1]}</div>
      </div>
    );
  }

  return <div>Current Path: {slug.join("/")}</div>;
}
