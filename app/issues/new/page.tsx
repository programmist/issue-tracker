"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
      <Controller
        name="description"
        control={control}
        render={({ field }) => {
          return <SimpleMDE placeholder="Description" {...field} />;
        }}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
