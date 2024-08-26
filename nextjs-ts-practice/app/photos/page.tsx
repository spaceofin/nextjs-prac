export default function PhotosPage() {
  return (
    <div>
      <h1 className="m-2 font-extralight text-3xl">PHOTOS PAGE</h1>
      <div className="grid grid-cols-3 gap-2">
        <img src="/images/tree.png" />
        <img src="/images/flowers.png" />
        <img src="/images/road.png" />
      </div>
    </div>
  );
}
