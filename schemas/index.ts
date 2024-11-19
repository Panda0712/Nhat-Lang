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

export const CreateMovieSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Hãy nhập tên phim và tối thiểu 1 ký tự",
  }),
  slug: z.string().optional(),
  original_name: z.string().min(1, {
    message: "Hãy nhập tên phim gốc và tối thiểu 1 ký tự",
  }),
  thumb_url: z
    .instanceof(File, { message: "Bạn phải tải lên một file hợp lệ" })
    .refine((file) => file.size > 0, {
      message: "Hình ảnh không được để trống",
    }),
  poster_url: z
    .instanceof(File, { message: "Bạn phải tải lên một file hợp lệ" })
    .refine((file) => file.size > 0, {
      message: "Hình ảnh không được để trống",
    }),
  description: z.string().min(10, {
    message: "Hãy nhập nội dung phim và tối thiểu 10 ký tự",
  }),
  total_episodes: z
    .number()
    .min(1, "Số tập phải lớn hơn hoặc bằng 0")
    .nullable(),
  current_episode: z.string().min(4, {
    message: "Hãy nhập trạng thái và tối thiểu 4 ký tự",
  }),
  created: z.string().optional(),
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

export const MovieSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Hãy nhập tên phim và tối thiểu 1 ký tự",
  }),
  slug: z.string().optional(),
  original_name: z.string().min(1, {
    message: "Hãy nhập tên phim gốc và tối thiểu 1 ký tự",
  }),
  thumb_url: z.instanceof(File).optional(),
  poster_url: z.instanceof(File).optional(),
  description: z.string().min(10, {
    message: "Hãy nhập nội dung phim và tối thiểu 10 ký tự",
  }),
  total_episodes: z.number().min(1, {
    message: "Hãy nhập số tập",
  }),
  current_episode: z.string().min(4, {
    message: "Hãy nhập trạng thái và tối thiểu 4 ký tự",
  }),
  created: z.string().optional(),
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

export const StaffSchema = z.object({
  name: z.string().min(4, {
    message: "Hãy nhập tên và tối thiểu 4 ký tự",
  }),
  role: z.string().min(5, {
    message: "Hãy nhập vai trò và tối thiểu 5 ký tự",
  }),
  department: z.string().min(5, {
    message: "Hãy nhập bộ phận và tối thiểu 5 ký tự",
  }),
});

export const CreatePartnerSchema = z.object({
  name: z.string().min(2, "Tên không được để trống và tối thiểu 2 ký tự"),
  type: z
    .string()
    .min(5, "Loại đối tác không được để trống và tối thiểu 5 ký tự"),
  thumb_image: z
    .instanceof(File, { message: "Bạn phải tải lên một file hợp lệ" })
    .refine((file) => file.size > 0, {
      message: "Hình ảnh không được để trống",
    }),
});

export const PartnerSchema = z.object({
  name: z.string().min(2, {
    message: "Hãy nhập tên và tối thiểu 4 ký tự",
  }),
  type: z.string().min(5, {
    message: "Hãy nhập loại và tối thiểu 5 ký tự",
  }),
  thumb_image: z.instanceof(File).optional(),
});

export const CustomerSchema = z.object({
  name: z.string().min(4, {
    message: "Hãy nhập tên và tối thiểu 4 ký tự",
  }),
  type: z.string().min(5, {
    message: "Hãy nhập loại và tối thiểu 5 ký tự",
  }),
  contact_info: z.string().min(5, {
    message: "Hãy nhập thông tin giao dịch và tối thiểu 5 ký tự",
  }),
});

export const CustomerTransactionsSchema = z.object({
  movie_id: z.number().min(1, {
    message: "Hãy nhập id của phim",
  }),
  customer_id: z.number().min(1, {
    message: "Hãy nhập id của khách hàng",
  }),
  transaction_date: z.string().optional(),
  details: z.string().min(10, {
    message: "Hãy nhập chi tiết và tối thiểu 10 ký tự",
  }),
});

export const PartnerTransactionsSchema = z.object({
  movie_id: z.number().min(1, {
    message: "Hãy nhập id của phim",
  }),
  partner_id: z.number().min(1, {
    message: "Hãy nhập id của đối tác",
  }),
  contract_cost: z.number().min(10000, {
    message: "Hãy nhập giá trị và tối thiểu 10000",
  }),
  contract_date: z.string().optional(),
  details: z.string().min(10, {
    message: "Hãy nhập chi tiết và tối thiểu 10 ký tự",
  }),
});
