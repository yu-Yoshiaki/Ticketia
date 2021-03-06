import type Stripe from "stripe";

//Firebase JavaScript SDK用  (Firebase Admin SDKでは使用不可)
export type Ticket = {
  id: string;
  active: boolean;
  name: string;
  description: string;
  images: string[];
  metadata: {
    organizer: string;
    startDay: string | null;
    startTime: string | null;
    location: string | null;
    postCode?: string | null;
    lat: number | null;
    lng: number | null;
  };
};

//Firebase JavaScript SDK用  (Firebase Admin SDKでは使用不可)
export type Price = {
  id: string;
  active: boolean;
  billingScheme: Stripe.Price.BillingScheme;
  currency: string;
  metadata: Stripe.Metadata;
  product: string | Stripe.Product | Stripe.DeletedProduct;
  recurring: Stripe.Price.Recurring | null;
  taxBehavior: "exclusive" | "inclusive" | "unspecified" | null;
  tiersMode: "graduated" | "volume" | null;
  transformQuantity: Stripe.Price.TransformQuantity | null;
  type: Stripe.Price.Type;
  unitAmount: number | null;
};
