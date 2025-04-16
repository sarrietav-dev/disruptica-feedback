import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { useNavigate } from "react-router";
import { Textarea } from "~/components/ui/textarea";
import StarRatingInput from "./star-rating-input";
import createFeedback, {
  formSchema,
  type FeedbackFormValues,
} from "../api/create-feedback";
import { isErr } from "~/lib/result";

interface FeedbackFormProps {
  productId: string;
}

export default function FeedbackForm({ productId }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  async function onSubmit(values: FeedbackFormValues) {
    setIsSubmitting(true);
    try {
      const response = await createFeedback(values);

      if (isErr(response)) {
        toast.error("Error", {
          description: response.error,
        });
        return;
      }

      toast("Feedback submitted", {
        description: "Thank you for your feedback!",
      });

      navigate(`/products/${productId}`);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
}
