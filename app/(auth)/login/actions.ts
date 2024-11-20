/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import bcrypt from "bcryptjs";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: any) {
  const supabase = await createClient();

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: any) {
  const supabase = await createClient();

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?message=Lỗi đăng ký người dùng");
  }

  const { password } = formData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: insertError } = await supabase.from("users").insert({
    email: data.email,
    name: formData.name,
    password: hashedPassword,
    emailVerified: false,
    role: "USER",
  });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
