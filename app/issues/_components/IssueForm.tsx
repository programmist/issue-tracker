"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

export type IssueFormType = z.infer<typeof issueSchema>;
interface Props {
  issue?: Issue;
}
const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(issueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const _onSubmit = handleSubmit(async (data: IssueFormType) => {
    try {
      setSubmitting(true);
      if (issue) {
        // Update Issue
        await axios.patch(`/api/issues/${issue.id}`, data);
        await router.push(`/issues/${issue.id}`);
      } else {
        // Create New Issue
        await axios.post("/api/issues", data);
        router.push("/issues");
      }
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={_onSubmit}>
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <FaExclamationTriangle size={18} />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <TextField.Root>
        <TextField.Input
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      {/* TODO Tweak blockquote > p bottom margins to add a quote author line.
          Maybe can modify how the the quote is rendered to include an author
          inline that has different styles (e.g. no ::before::after quotes, etc)
      */}
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
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
      <Button disabled={submitting} className="hover:cursor-pointer">
        Submit {submitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
