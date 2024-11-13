"use server";

import { getUserByEmail, insertNewUser } from "@/app/_lib/action";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Các trường không hợp lệ" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser?.length !== 0) {
    return { error: "Email đã được sử dụng" };
  }

  const newUserData = {
    name,
    email,
    password: hashedPassword,
  };

  const { error } = await insertNewUser(newUserData);

  if (error) {
    return;
  }

  return { success: "Đăng ký thành công" };
};
