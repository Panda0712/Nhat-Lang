import { RegisterSchema } from "@/schemas";
import supabase from "./supabase";
import * as z from "zod";

export const getUserByEmail = async (email: string) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      throw new Error("Lỗi lấy dữ liệu người dùng:", error);
    }

    return user;
  } catch {
    return null;
  }
};

export const insertNewUser = async (
  newData: z.infer<typeof RegisterSchema>
) => {
  const { data, error } = await supabase
    .from("users")
    .insert([newData])
    .select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Tạo tài khoản mới thất bại");
  }

  return { data, error };
};
