import Image from "next/image";
import { fetchPosts } from "@/lib/serverMethods";
import AddThread from "@/components/threads/AddThread";
import PostCard from "@/components/common/PostCard";
import { Suspense } from "react";
import Loading from "@/components/common/loading";
// import { refreshLogo } from "../../refreshLogo";
import LogoAnimation from "@/components/common/LogoAnimation";



export default async function Home() {
  // document.addEventListener('DOMContentLoaded', () => {
  //   refreshLogo();
  // });
  const posts: Array<PostType> | [] = await fetchPosts(1);
  return (
    <div className="page">
      <LogoAnimation/>
      <main className="content">
        <AddThread />
        <Suspense fallback={<Loading />}>
          <div className="mt-10">
            {posts.map((item) => (
              <PostCard post={item} key={item.id} />
            ))}
          </div>
        </Suspense>
      </main>
    </div>
  );
}
