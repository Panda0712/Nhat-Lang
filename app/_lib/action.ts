import { RegisterSchema } from "@/schemas";
import supabase from "./supabase";
import * as z from "zod";
import toast from "react-hot-toast";

export const getUserByEmail = async (email: string) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      toast.error(error.message);
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
    toast.error(error.message);
    throw new Error("Tạo tài khoản mới thất bại");
  }

  return { data, error };
};

export const getStaffs = async () => {
  const { data: staff, error } = await supabase.from("staff").select("*");

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu nhân viên thất bại!");
  }

  return { staff, error };
};

export const getCustomers = async () => {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*");

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu khách hàng thất bại!");
  }

  return { customers, error };
};

export const getPartners = async () => {
  const { data: partners, error } = await supabase.from("partners").select("*");

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu đối tác thất bại!");
  }

  return { partners, error };
};

export const getMovies = async () => {
  const { data: movies, error } = await supabase.from("movies").select("*");

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu phim thất bại!");
  }

  return { movies, error };
};
