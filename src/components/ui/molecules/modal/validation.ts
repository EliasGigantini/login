import { z } from "zod";

export const PostSchema = z.object({
    post: z.object({
      title: z
        .string({ message: "Cannot be empty" })
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(30, { message: "Title must be maximum 30 characters long"})
    })
  });

export const CommentSchema = z.object({
    comment: z.object({
      text: z
        .string({ message: "Cannot be empty" })
        .min(1, { message: "Comment must be at least 1 character long" })
        .max(140, { message: "Comment must be maximum 140 characters long"})
    })
  });

export const UserSchema = z.object({
    user: z.object({
      firstName: z
        .string({ message: "Cannot be empty" })
        .min(2, { message: "Name must have at least 2 characters"})
        .max(30, { message: "Name must have less than 30 characters"}),
      lastName: z
        .string({ message: "Cannot be empty" })
        .min(2, { message: "Last Name must have at least 2 characters"})
        .max(30, { message: "Last Name must have less than 30 characters"}),
      age: z
        .coerce.number()
        .int({ message: "Please enter a valid number"})
        .gte(1)
        .lte(100)
    })
  });

export const LoginSchema = z.object({
  user: z
    .string()
    .email("Please insert a valid email")
    .min(4, { message: "User must contain at least 4 character(s)" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
})