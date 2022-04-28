import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { app, ticketConverter } from "src/lib/firebase";
import type { ReadPrice, ReadTicket } from "src/type/ticket";

import { DetailPageLayout } from "./layout/DetailPageLayout";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
const firestore = getFirestore(app);

export const getStaticPaths: GetStaticPaths = async () => {
  const colRef = collection(firestore, "ticket").withConverter(ticketConverter);
  const documents = await getDocs(colRef);

  const paths = documents.docs.map((data) => {
    return { params: { id: data.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (paths) => {
  if (paths.params) {
    const docRef = doc(
      firestore,
      "ticket",
      paths.params.id as string
    ).withConverter(ticketConverter);

    const document = await getDoc(docRef);
    const data = JSON.parse(JSON.stringify(document.data()));

    const res = await axios.get(`/api/fb/price/${data.id}/get`);
    const prices: ReadPrice[] = await res.data;

    return {
      props: {
        data,
        prices
      },
      revalidate: 5,
    };
  }

  return {
    notFound: true,
  };
};

const Index: CustomNextPage<{ data: ReadTicket; prices:ReadPrice[] }> = (props) => {
  return <DetailPageLayout ticket={props.data} test={false} prices={props.prices} />;
};

Index.getLayout = Layout;

export default Index;
