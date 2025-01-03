"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "./modal";
import { DialogTitle } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createGuest } from "@/lib/queries";
import { CreateGuestInput, createGuestSchema } from "@/schemas/guest-schema";




export const CreateGuest = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateGuestInput>({
    resolver: zodResolver(createGuestSchema),
    defaultValues: {
      count: "",
      checkIn: undefined,
      checkOut: undefined,
      phoneNo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests-list'] });
      queryClient.invalidateQueries({ queryKey: ['guests-stats'] });
      setIsOpen(false);
      toast({
        title: "Created Successfully",
      });
    },
    onError: (error: Error) => {
      if (error.message === "Please login first") {
        router.push("/sign-in");
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function handleSubmit(data:CreateGuestInput) {
    mutation.mutate(data);
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal
        showModal={isOpen}
        setShowModal={setIsOpen}
        className="max-w-2xl p-6"
      >
        <DialogTitle className="sr-only">Create Guest</DialogTitle>
        <div className="bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Create Guest</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the number of guests"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Arrival</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Check-out</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-3 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};