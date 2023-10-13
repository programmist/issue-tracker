"use client";

import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type CreateIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <FaExclamationTriangle size={18} />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      {/* TODO Tweak blockquote > p bottom margins to add a quote author line.
          Maybe can modify how the the quote is rendered to include an author
          inline that has different styles (e.g. no ::before::after quotes, etc)
      */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return (
            <SimpleMDE
              className="prose text-black marker:text-black"
              placeholder="Description"
              {...field}
            />
          );
        }}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={submitting}>
        Submit New Issue {submitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewIssuePage;
