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

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          // Note: Since validation is on client now, this should only
          // catch unexpected server errors, not validation errors
          setError("An unexpected error occurred");
        }
      })}
    >
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
      {errors.title && (
        <Text color="red" as="p">
          {errors.title.message}
        </Text>
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <SimpleMDE placeholder="Description" {...field} />;
        }}
      />
      {errors.description && (
        <Text color="red" as="p">
          {errors.description.message}
        </Text>
      )}
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
