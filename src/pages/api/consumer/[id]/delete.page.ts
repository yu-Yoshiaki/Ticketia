import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseRoleKey = process.env.SUPABASE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseRoleKey);

const UserDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query as { id: string };

    const { error } = await supabase.auth.api.deleteUser(id);

    if (error) {
      res.status(error.status).json(error.message);
    }

    res.status(200).json("User delete success.");
  } catch (error: any) {
    res.status(error.statusCode || 500).json(error.message);
  }
};

export default UserDelete;
