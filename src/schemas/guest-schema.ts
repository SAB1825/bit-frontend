import { z } from "zod";

export const createGuestSchema = z.object({
  count: z.string().min(1, {
    message: "Please enter a valid number of guests",
  }),
  checkIn: z.date({
    required_error: "Please select a check-in date",
  }),
  checkOut: z.date({
    required_error: "Please select a check-out date",
  }),
  phoneNo: z
    .string()
    .min(10, {
      message: "Please enter a valid phone number",
    })
    .max(10, {
      message: "Please enter a valid phone number",
    }),
});

export type CreateGuestInput = z.infer<typeof createGuestSchema>;