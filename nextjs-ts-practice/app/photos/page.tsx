import Image from "next/image";
import tree from "../../public/images/tree.png";
import flowers from "../../public/images/flowers.png";
import road from "../../public/images/road.png";

export default function PhotosPage() {
  return (
    <div>
      <h1 className="m-2 font-extralight text-3xl">PHOTOS PAGE</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Image
          src={tree}
          alt="Picture of the tree"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={true}
          quality={50}
        />
        <Image
          src={flowers}
          alt="Picture of the flowers"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Image
          src={road}
          alt="Picture of the road"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={100}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
