import Image from "next/image";
import type { VFC } from "react";
// import { useEffect, useState } from "react";
import type { ReadTicket } from "src/type/ticket";

const Checkout: VFC<{ priceList: ReadTicket["priceList"]; stripePriceId: ReadTicket["stripePriceId"] }> = (props) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-3xl font-bold ">JPY {props.priceList.nomal.price}</p>

      <form
        method={"POST"}
        action={`/api/checkout_session/${props.stripePriceId}`}
        className="flex justify-center items-center"
      >
        <button type="submit" role="link" className={"flex justify-center items-center py-4 px-16 bg-blue"}>
          Checkout
        </button>
      </form>
    </div>
  );
};

const DateAndTime = () => {
  return (
    <div className="py-5 px-2 space-y-2 bg-gray">
      <div className="flex space-x-2">
        <p className="font-bold">開催日</p>
        <p>8/20</p>
      </div>
      <div className="flex space-x-2">
        <p className="font-bold">開催時間</p>
        <p>20:00~</p>
      </div>
    </div>
  );
};

const Overview: VFC<{ name: ReadTicket["name"]; description: ReadTicket["description"] }> = (props) => {
  return (
    <div>
      <h1 className="py-5 text-4xl font-extrabold text-left">{props.name}</h1>
      <p className=" p-10 w-full min-h-[120px] text-lg border border-gray md:p-20">{props.description}</p>
    </div>
  );
};

const Organizer = () => {
  const datas = [
    { title: "主催者", value: "TICKETIA" },
    { title: "TEL", value: "090-1234-5678" },
    { title: "住所", value: "東京都渋谷区道玄坂1−234−5" },
  ];
  return (
    <div className="w-full border border-gray">
      <ul className="space-y-3">
        {datas.map((data) => {
          return (
            <li key={data.title} className="flex space-x-10 border-b border-pink">
              <p className="w-[80px] text-xl text-left">{data.title}</p>
              <p className="text-xl">{data.value}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const DetailPageLayout: VFC<{ ticket: ReadTicket; test: boolean }> = (props) => {
  return (
    <div className="pb-4 tracking-wide leading-relaxed">
      <div className="pt-6 text-center">
        <Image
          width={800}
          height={480}
          src={"/bread.jpg"}
          alt={"test"}
          className="object-cover object-center w-full h-full"
        />

        {/* Product info */}
        <div className="px-4 pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 ">
          <Overview name={props.ticket.name} description={props.ticket.description} />
          <DateAndTime />
          <Checkout priceList={props.ticket.priceList} stripePriceId={props.ticket.stripePriceId} />
          {/* {props.ticket.address && <Address address={props.ticket.address} />} */}
          <Organizer />
        </div>
      </div>
    </div>
  );
};
