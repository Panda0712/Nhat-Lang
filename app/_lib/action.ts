/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterSchema } from "@/schemas";
import supabase from "./supabase";
import * as z from "zod";
import toast from "react-hot-toast";
import { Movie } from "../movies/columns";
import { Staff } from "../staffs/columns";
import { Partner } from "../partners/columns";
import { Customer } from "../customers/columns";

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
  const { data: staff, error } = await supabase
    .from("staff")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu nhân viên thất bại!");
  }

  return { staff, error };
};

export const insertStaff = async (newData: Staff) => {
  const { data: staff, error } = await supabase
    .from("staff")
    .insert([newData])
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Thêm nhân viên mới thất bại!");
  }

  return { staff, error };
};

export const getCustomers = async () => {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu khách hàng thất bại!");
  }

  return { customers, error };
};

export const insertCustomer = async (newData: Customer) => {
  const { data: customer, error } = await supabase
    .from("customers")
    .insert([newData])
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Thêm khách hàng mới thất bại!");
  }

  return { customer, error };
};

export const getPartners = async () => {
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu đối tác thất bại!");
  }

  return { partners, error };
};

export const insertPartner = async (newData: Partner) => {
  const { data: partner, error } = await supabase
    .from("partners")
    .insert([newData])
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Thêm đối tác mới thất bại!");
  }

  return { partner, error };
};

export const getMovies = async () => {
  const { data: movies, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu phim thất bại!");
  }

  return { movies, error };
};

export const getMovieById = async (id: string) => {
  const { data: movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", Number(id));

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Lấy dữ liệu phim theo id thất bại!");
  }

  return { movie, error };
};

export const updateMovie = async (movieData: any, movieId: number) => {
  const { data: updatedMovie, error } = await supabase
    .from("movies")
    .update(movieData)
    .eq("id", movieId)
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Cập nhật phim thất bại!");
  }

  return { updatedMovie, error };
};

export const deleteMovieById = async (id: number) => {
  const { error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Xóa phim thất bại!");
  }
};

export const insertMovie = async (newData: Movie) => {
  const { data: movie, error } = await supabase
    .from("movies")
    .insert([newData])
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Thêm phim thất bại!");
  }

  return { movie, error };
};
