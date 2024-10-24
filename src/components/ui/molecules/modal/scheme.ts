import { z } from "zod";

export const PostSchema = z.object({
    title: z.string({ message: "Required" }).min(3).max(40),
  });