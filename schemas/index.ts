import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Hãy nhập email",
  }),
  password: z.string().min(6, {
    message: "Hãy nhập mật khẩu! Tối thiểu 6 ký tự",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Hãy nhập email",
  }),
  password: z.string().min(6, {
    message: "Hãy nhập mật khẩu và tối thiểu 6 ký tự",
  }),
  name: z.string().min(4, {
    message: "Hãy nhập tên và tối thiểu 4 ký tự",
  }),
});
