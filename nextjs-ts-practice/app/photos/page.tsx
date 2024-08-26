import Image from "next/image";
import tree from "../../public/images/tree.png";
import flowers from "../../public/images/flowers.png";
import road from "../../public/images/road.png";

export default function PhotosPage() {
  return (
    <div>
      <h1 className="m-2 font-extralight text-3xl">PHOTOS PAGE</h1>
      <div className="grid grid-cols-3 gap-2">
        <Image src={tree} alt="Picture of the tree" />
        <Image src={flowers} alt="Picture of the flowers" />
        <Image src={road} alt="Picture of the road" />
      </div>
    </div>
  );
}
