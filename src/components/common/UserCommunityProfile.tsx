"use client"
import React, { useState, useEffect, useRef } from "react";
import UserAvatar from "../common/UserAvatar";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ImagePreviewCard from "../common/ImagePreviewCard";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Image } from "lucide-react";

export default function UserCommunityProfile({ user }: { user: ShowCommunityType }) {
  const { toast } = useToast();
  const { data } = useSession();
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [image, setimage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});

  const handleIconClick = () => {
    imageRef.current?.click();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("The image is", selectedFile);
      setimage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };
  const removePreview = () => {
    setimage(null);
    setPreviewUrl(undefined);
  };

  const submit = () => {
    const url = window.location.href; // Get the current URL
    const parts = url.split('/');     // Split the URL by '/'
    const community_id = parts.pop();     // Get the last part of the URL (in this case, "13")

    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    if(community_id) formData.append("community_id", community_id);

    axios
      .post("/api/post", formData)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        console.log("The image is", response);
        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {
          setContent("");
          setimage(null);
          setPreviewUrl(undefined);
          setErrors({});
          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-500",
          });
          router.refresh();
        } else if (response.status == 500) {
          toast({
            title: "Error",
            description: response.message,
            className: "bg-red-300",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 mt-5">
        <div className="self-start">
          <UserProfileAvatar name={user.name} image="" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-md text-orange-300">@{user.username}</p>
          <h1 className="text-l mt-3">{user.bio}</h1>
        </div>
      </div>
      <div className="mt-5 ml-24">
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-primary/90 hover:text-black">Create Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Create a post for the community. Click post when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5">
              {previewUrl ? (
                <div className="mb-5">
                  <ImagePreviewCard image={previewUrl} callback={removePreview} />
                </div>
              ) : (
                <></>
              )}
              <div className="flex justify-start items-start">
                <UserAvatar name={data?.user?.name ?? "T"} image="" />
                <textarea
                  className="w-full h-24 text-md p-2 bg-muted outline-none  resize-none rounded-lg placeholder:font-normal ml-2"
                  placeholder="Type something great...."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <span className="text-red-400 font-bold ml-12">{errors?.content}</span>

              <div className="ml-12  flex justify-between items-center">
                <input
                  type="file"
                  ref={imageRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Image
                  onClick={handleIconClick}
                  height={20}
                  width={20}
                  className="cursor-pointer"
                />
                <DialogClose asChild>
                  <Button
                    disabled={content.length <= 1 || loading ? true : false}
                    onClick={submit}
                    type="submit"
                  >
                    {loading ? "Processing.." : "Post"}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
