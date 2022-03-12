import Image from "next/image";
import Link from "next/link";
import type { VFC } from "react";
import type { Ticket } from "src/type/ticket";

export const CardLayout: VFC<{ ticket: Ticket }> = (props) => {
  return (
    <div className="group relative min-h-[380px] bg-white shadow-lg">
      <div className="w-full rounded-md group-hover:opacity-75 ">
        <Link href={`/ticket/${props.ticket.id}`}>
          <a>
            <Image
              src={"/noimage.png"}
              alt={""}
              width={420}
              height={300}
              className="block object-cover object-center w-full h-full"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col p-[10px] space-y-1">
        <h2 className="text-lg font-medium text-gray-900 ">{props.ticket.name}</h2>
        <p className="px-1">{"コロナ禍で閉店してしまった仙台名物厚切り熟牛タンを全国のご家庭へ届けたい！！"}</p>
        <p className="px-1 text-xl text-right">pay {props.ticket.priceList.nomal.price}~</p>
      </div>
    </div>
  );
};