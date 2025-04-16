import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import type { Product } from "~/features/products/types/product";
import StarRatingInput from "./star-rating-input";
import { useNavigate } from "react-router";
import createFeedback from "../api/create-feedback";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "Please select a product.",
  }),
  rating: z
    .number()
    .min(1, {
      message: "Please select a rating.",
    })
    .max(5),
  comment: z
    .string()
    .min(3, {
      message: "Comment must be at least 3 characters.",
    })
    .max(500, {
      message: "Comment must not exceed 500 characters.",
    }),
});

type FeedbackFormValues = z.infer<typeof formSchema>;

interface NewFeedbackFormProps {
  products: Product[];
}

export function NewFeedbackForm({ products }: NewFeedbackFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      rating: 0,
      comment: "",
    },
  });

  const rating = form.watch("rating");

  async function onSubmit(values: FeedbackFormValues) {
    setIsSubmitting(true);
    try {
      await createFeedback(
        values.productId,
        "4d4e11ad-aa35-43b8-a0d7-b51163025112",
        {
          rating: values.rating,
          comment: values.comment,
        },
      );

      toast("Feedback submitted", {
        description: "Thank you for your feedback!",
      });

      navigate("/feedback");
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the product you want to review
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <StarRatingInput
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Select a rating from 1 to 5 stars
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts about this product..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your review will help others make better decisions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting || form.getValues().rating === 0}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </Form>
  );
}
