/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterSchema } from "@/schemas";
import toast from "react-hot-toast";
import * as z from "zod";
import { Customer } from "../customers/columns";
import { Staff } from "../staffs/columns";
import supabase, { supabaseUrl } from "./supabase";

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

export const updateStaff = async (staffData: any, staffId: number) => {
  const { data: updatedStaff, error } = await supabase
    .from("staff")
    .update(staffData)
    .eq("id", staffId)
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Cập nhật nhân viên thất bại!");
  }

  return { updatedStaff, error };
};

export const deleteStaffById = async (staffId: number) => {
  const { data: staff, error } = await supabase
    .from("staff")
    .delete()
    .eq("id", Number(staffId));

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Xóa nhân viên thất bại!");
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

export const updateCustomer = async (customerData: any, customerId: number) => {
  const { data: updatedCustomer, error } = await supabase
    .from("customers")
    .update(customerData)
    .eq("id", customerId)
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Cập nhật khách hàng thất bại!");
  }

  return { updatedCustomer, error };
};

export const deleteCustomerById = async (customerId: number) => {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", customerId);

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Xóa khách hàng thất bại!");
  }
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

export const insertPartner = async (newData: any) => {
  const hasNewFile = newData.thumb_image?.file instanceof File;
  let imagePath = newData.thumb_image;

  if (hasNewFile) {
    const file = newData.thumb_image.file;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`.replaceAll(
      "/",
      ""
    );

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (storageError) {
      console.error("Storage error:", storageError);
      throw new Error("Không thể tải ảnh đối tác lên storage!");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/images/${fileName}`;
  }

  const partnerData = {
    name: newData.name,
    type: newData.type,
    thumb_image: imagePath,
  };

  const { data: partner, error: insertError } = await supabase
    .from("partners")
    .insert([partnerData])
    .select();

  if (insertError) {
    if (hasNewFile && imagePath) {
      const fileName = imagePath.split("/").pop();
      await supabase.storage.from("images").remove([fileName]);
    }
    console.error("Insert error:", insertError);
    throw new Error("Thêm đối tác mới thất bại!");
  }

  return { partner, error: null };
};

export const updatePartner = async (partnerData: any, partnerId: number) => {
  const isExistingImage =
    typeof partnerData.thumb_image === "string" ||
    partnerData.thumb_image?.startsWith?.(supabaseUrl);

  let imagePath = partnerData.thumb_image;

  if (!isExistingImage && partnerData.thumb_image?.file instanceof File) {
    const file = partnerData.thumb_image.file;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`.replaceAll(
      "/",
      ""
    );

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (storageError) {
      console.error("Storage error:", storageError);
      throw new Error("Không thể tải ảnh đối tác lên storage!");
    }

    imagePath = `${supabaseUrl}/storage/v1/object/public/images/${fileName}`;
  }

  const { data: updatedPartner, error: updateError } = await supabase
    .from("partners")
    .update({
      ...partnerData,
      thumb_image: imagePath,
    })
    .eq("id", partnerId)
    .select();

  if (updateError) {
    console.error("Update error:", updateError);
    throw new Error("Cập nhật đối tác thất bại!");
  }

  return { updatedPartner, error: null };
};

export const deletePartnerById = async (partnerId: number) => {
  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", partnerId);

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Xóa đối tác thất bại!");
  }
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
  const isExistingImage =
    (typeof movieData.thumb_url === "string" ||
      movieData.thumb_url?.startsWith?.(supabaseUrl)) &&
    (typeof movieData.poster_url === "string" ||
      movieData.poster_url?.startsWith?.(supabaseUrl));

  let imageThumbPath = movieData.thumb_url;
  let imagePosterPath = movieData.thumb_url;

  if (
    !isExistingImage &&
    movieData.thumb_url?.file instanceof File &&
    movieData.poster_url?.file instanceof File
  ) {
    const fileThumb = movieData.thumb_url.file;
    const filePoster = movieData.poster_url.file;

    const fileThumbExt = fileThumb.name.split(".").pop();
    const fileThumbName =
      `${Math.random()}-${Date.now()}.${fileThumbExt}`.replaceAll("/", "");

    const filePosterExt = filePoster.name.split(".").pop();
    const filePosterName =
      `${Math.random()}-${Date.now()}.${filePosterExt}`.replaceAll("/", "");

    const [{ error: storageError1 }, { error: storageError2 }] =
      await Promise.all([
        supabase.storage.from("images").upload(fileThumbName, fileThumb, {
          cacheControl: "3600",
          upsert: false,
          contentType: fileThumb.type,
        }),

        supabase.storage.from("images").upload(filePosterName, filePoster, {
          cacheControl: "3600",
          upsert: false,
          contentType: filePoster.type,
        }),
      ]);

    if (storageError1 || storageError2) {
      console.error("Storage1 error:", storageError1);
      console.error("Storage2 error:", storageError2);
      throw new Error("Không thể tải ảnh đối tác lên storage!");
    }

    imageThumbPath = `${supabaseUrl}/storage/v1/object/public/images/${fileThumbName}`;
    imagePosterPath = `${supabaseUrl}/storage/v1/object/public/images/${filePosterName}`;
  }

  const { data: updatedMovie, error: updateError } = await supabase
    .from("movies")
    .update({
      ...movieData,
      thumb_url: imageThumbPath,
      poster_url: imagePosterPath,
    })
    .eq("id", movieId)
    .select();

  if (updateError) {
    console.error("Update error:", updateError);
    throw new Error("Cập nhật phim thất bại!");
  }

  return { updatedMovie, error: null };
};

export const deleteMovieById = async (id: number) => {
  const { error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Xóa phim thất bại!");
  }
};

export const insertMovie = async (newData: any) => {
  const hasNewFile =
    newData.thumb_url?.file instanceof File &&
    newData.poster_url?.file instanceof File;
  let imageThumbPath = newData.thumb_url;
  let imagePosterPath = newData.poster_url;

  if (hasNewFile) {
    const fileThumb = newData.thumb_url.file;
    const filePoster = newData.poster_url.file;

    const fileThumbExt = fileThumb.name.split(".").pop();
    const fileThumbName =
      `${Math.random()}-${Date.now()}.${fileThumbExt}`.replaceAll("/", "");

    const filePosterExt = filePoster.name.split(".").pop();
    const filePosterName =
      `${Math.random()}-${Date.now()}.${filePosterExt}`.replaceAll("/", "");

    const [{ error: storageError1 }, { error: storageError2 }] =
      await Promise.all([
        supabase.storage.from("images").upload(fileThumbName, fileThumb, {
          cacheControl: "3600",
          upsert: false,
          contentType: fileThumb.type,
        }),

        supabase.storage.from("images").upload(filePosterName, filePoster, {
          cacheControl: "3600",
          upsert: false,
          contentType: filePoster.type,
        }),
      ]);

    if (storageError1 || storageError2) {
      console.error("Storage1 error:", storageError1);
      console.error("Storage2 error:", storageError2);
      throw new Error("Không thể tải ảnh đối tác lên storage!");
    }

    imageThumbPath = `${supabaseUrl}/storage/v1/object/public/images/${fileThumbName}`;
    imagePosterPath = `${supabaseUrl}/storage/v1/object/public/images/${filePosterName}`;
  }

  const movieData = {
    ...newData,
    thumb_url: imageThumbPath,
    poster_url: imagePosterPath,
  };

  const { data: movie, error: insertError } = await supabase
    .from("movies")
    .insert([movieData])
    .select();

  if (insertError) {
    if (hasNewFile && imageThumbPath && imagePosterPath) {
      const fileThumbName = imageThumbPath.split("/").pop();
      const filePosterName = imagePosterPath.split("/").pop();
      await supabase.storage
        .from("images")
        .remove([fileThumbName, filePosterName]);
    }
    console.error("Insert error:", insertError);
    throw new Error("Thêm đối tác mới thất bại!");
  }

  return { movie, error: null };
};
