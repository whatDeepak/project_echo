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

  const [authState, setAuthState] = useState<CommunityAuthStateType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
  });
  const [errors, setErrors] = useState<CommunityAuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("/api/communities/register", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {

        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  
  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <Button size="sm" className="mr-5 mt-5">
            Create Community
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
            <form onSubmit={submit} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Community Name</FormLabel>
                    <FormControl>
                        <Input type="text" id="name" placeholder="Type your community name" {...field} 
                        onChange={(event) =>
                        setAuthState({ ...authState, name: event.target.value })} 
                        />
                    </FormControl>
                    <FormMessage>
                    <span className="text-red-400 font-bold">
                      {errors.name}
                    </span>
                    </FormMessage>
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
                        <Input type="text" id="username" placeholder="Type your community username" {...field}
                         onChange={(event) =>
                          setAuthState({ ...authState, username: event.target.value })
                        }
                         />
                    </FormControl>
                    <FormMessage>
                    <span className="text-red-400 font-bold">
                      {errors.username}
                    </span>
                    </FormMessage>
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
                        <Input type="text" id="bio" placeholder="Type your community bio" {...field} 
                        onChange={(event) =>
                          setAuthState({ ...authState, bio: event.target.value })
                        }
                         />
                    </FormControl>
                    <FormMessage>
                    <span className="text-red-400 font-bold">
                      {errors.bio}
                    </span>
                    </FormMessage>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" id="email" placeholder="Type your email" {...field} 
                        onChange={(event) =>
                          setAuthState({ ...authState, email: event.target.value })
                        }
                        />
                    </FormControl>
                    <FormMessage>
                    <span className="text-red-400 font-bold">
                      {errors.email}
                    </span>
                    </FormMessage>
                    </FormItem>
                )}
                />
                
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" id="password" placeholder="Create Password" {...field} 
                        onChange={(event) =>
                          setAuthState({ ...authState, password: event.target.value })
                        }
                        />
                    </FormControl>
                    <FormMessage>
                    <span className="text-red-400 font-bold">
                      {errors.password}
                    </span>
                    </FormMessage>
                    </FormItem>
                )}
                />
              
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" id="cpassword" placeholder="Confirm password" {...field} 
                        onChange={(event) =>
                          setAuthState({
                            ...authState,
                            password_confirmation: event.target.value,
                          })
                        }
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Submit"}
                </Button>
                <AlertDialogCancel className="ml-5">Cancel</AlertDialogCancel>
            </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
