import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { VFC } from "react";
import type { ReadPrice } from "src/type/ticket";
import { useRouter } from 'next/router';

type Checkout = {
  name: string;
};

export const Checkout: VFC<Checkout> = (props) => {
  const router = useRouter();
  const [prices, setPrices] = useState<ReadPrice[]>();
  const { id } = router.query;

  const fetchPrices = useCallback(async () => {
    const res = await axios.get(`/api/fb/price/${id}/get`);
    const prices: ReadPrice[] = await res.data;
    setPrices(prices);
  }, [id]);

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="pb-5 border border-gray">
      {prices ? <div><p className="p-2 mb-5 w-full text-left bg-skyblue">配信</p>
      <h3 className="px-3 mb-10 text-xl font-bold text-left">{props.name}</h3>
      <div className="flex justify-between mr-1 mb-16 ml-3">
        <p className="py-1 px-2 w-[60px] text-sm bg-pink rounded-full ">
          販売中
        </p>
        <p className="text-2xl font-bold text-right">
          {prices[0].unitAmount}円<span className="text-sm">（税込）</span>
        </p>
      </div>

      <form
        action={`/api/checkout/${prices[0].id}`}
        method="POST"
        // onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <button
          type="submit"
          role="link"
          className={
            "flex justify-center items-center py-4 px-20  text-white bg-blue"
          }
        >
          チケット購入
        </button>
      </form></div>:"Loding..."}
      
    </div>
  );
};
