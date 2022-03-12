import type { CustomNextPage } from "next";
import Link from "next/link";
import { FixedLayout } from "src/layout";

import { AuthForm } from "./layout/AuthForm";

const Signup: CustomNextPage = () => {
  return (
    <div>
      <AuthForm createNew={true} />{" "}
      <Link href="/auth/login">
        <a className="flex justify-center items-center text-blue-600">ユーザー作成済みの方</a>
      </Link>
    </div>
  );
};

Signup.getLayout = FixedLayout;

export default Signup;
