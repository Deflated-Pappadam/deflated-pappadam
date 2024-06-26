import Image from "next/image";
import React from "react";

function SaleBox(props: {
  imgUrl: string;
  itemName: string;
  price: string;
  desc: string;
  id: string;
}) {
  return (
    <a
      href={`/item/${props.id}`}
      className={`justiify-start mb-5 flex h-[500px] w-[350px]  flex-col overflow-hidden rounded-2xl bg-[#f4f2f4] drop-shadow-2xl transition-all hover:scale-[102%]`}
    >
      <div className="flex flex-col">
        <Image
          src={props.imgUrl}
          alt=""
          width={1080}
          height={1080}
          className="h-[250px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-5">
        <h1 className=" text-xl text-black">{props.itemName}</h1>
        <h2 className=" text-md text-black">Price : {props.price} Matic</h2>
      </div>
      <h2 className="flex px-4 text-[#4a4a4d]">
        {props.desc.substring(0, 160)}...
      </h2>
      <div>.</div>
    </a>
  );
}

export default SaleBox;
