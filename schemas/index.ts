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

export const MovieSchema = z.object({
  name: z.string().min(1, {
    message: "Hãy nhập tên phim và tối thiểu 1 ký tự",
  }),
  original_name: z.string().min(1, {
    message: "Hãy nhập tên phim gốc và tối thiểu 1 ký tự",
  }),
  thumb_url: z.string({
    message: "Hãy nhập ảnh đại diện của phim",
  }),
  poster_url: z.string({
    message: "Hãy nhập ảnh poster của phim",
  }),
  description: z.string().min(10, {
    message: "Hãy nhập nội dung phim và tối thiểu 10 ký tự",
  }),
  total_episodes: z.number({
    message: "Hãy nhập số tập",
  }),
  current_episode: z.string().min(4, {
    message: "Hãy nhập trạng thái và tối thiểu 4 ký tự",
  }),
  modified: z.string().optional(),
  time: z.string().min(4, {
    message: "Hãy nhập thời lượng và tối thiểu 4 ký tự",
  }),
  quality: z.string().min(2, {
    message: "Hãy nhập chất lượng và tối thiểu 2 ký tự",
  }),
  language: z.string().min(4, {
    message: "Hãy nhập ngôn ngữ và tối thiểu 4 ký tự",
  }),
  director: z.string().optional().nullable(),
  casts: z.string().optional().nullable(),
  category: z.string().min(4, {
    message: "Hãy nhập danh mục và tối thiểu 4 ký tự",
  }),
  group: z.string().optional().nullable(),
});
