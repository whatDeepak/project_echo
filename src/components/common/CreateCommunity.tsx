"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";

export default function CreateCommunity() {
  const form = useForm(); // Initialize the form

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (e: { preventDefault: () => void; }) => {
    setLoading(true);

    axios
      .post("/api/communities/")
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 400) {
        } else if (response.status == 200) {
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="mr-5 mt-5">
          Create Community
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Community Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Type your community name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Type your community username" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                        <Input placeholder="Type your community bio" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={loading}>{loading ? "Processing..." : "Submit"}</Button>
                <AlertDialogCancel className="ml-5">Cancel</AlertDialogCancel>
            </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
