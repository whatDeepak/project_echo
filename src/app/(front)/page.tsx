import Image from "next/image";
import { fetchPosts } from "@/lib/serverMethods";
import AddThread from "@/components/threads/AddThread";
import PostCard from "@/components/common/PostCard";
import { Suspense } from "react";
import Loading from "@/components/common/loading";
import { refreshLogo } from "../../refreshLogo";


export default async function Home() {
  document.addEventListener('DOMContentLoaded', () => {
    refreshLogo();
  });
  const posts: Array<PostType> | [] = await fetchPosts(1);
  return (
    <div className="page">
      <div className="refresher">
        <div className="logoWrapper">
          <div className="logo">
            <div id="animated-logo">
              
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect width="40" height="40" rx="20" fill="black"/> */}
                <path className="animated-logo-base" d="M15.5412 3.75C10.0779 9.97529 7.5301 15.1319 7.83728 20.3404C8.11277 25.0118 10.6937 29.9251 15.5524 36.2481L18 34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="animated-logo-base" d="M7.90894 20.0538H11.098" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M15.5771 3.75L18.0854 5.82828" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M19.8769 7.26154C10.9275 16.5834 11.0586 22.1949 19.8769 32.8459" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M23.0302 10.4148C15.5371 17.9429 15.6436 22.3861 23.0302 29.6926" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M17.5479 20.0538H21.7761" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" d="M26.1835 13.5681C20.9594 18.1875 21.0669 21.5375 26.1835 26.5394" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-base" fill-rule="evenodd" clip-rule="evenodd" d="M28.6408 17.4219C30.0921 17.4219 31.25 18.6093 31.25 20.0513C31.25 21.5084 30.1072 22.7344 28.6408 22.7344C27.1701 22.7344 26.0156 21.5127 26.0156 20.0513C26.0156 18.6049 27.1851 17.4219 28.6408 17.4219Z" stroke="white" stroke-width="2"/>

                <path className="animated-logo-runner" d="M15.5412 3.75C10.0779 9.97529 7.5301 15.1319 7.83728 20.3404C8.11277 25.0118 10.6937 29.9251 15.5524 36.2481L18 34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="animated-logo-runner" d="M7.90894 20.0538H11.098" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M15.5771 3.75L18.0854 5.82828" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M19.8769 7.26154C10.9275 16.5834 11.0586 22.1949 19.8769 32.8459" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M23.0302 10.4148C15.5371 17.9429 15.6436 22.3861 23.0302 29.6926" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M17.5479 20.0538H21.7761" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" d="M26.1835 13.5681C20.9594 18.1875 21.0669 21.5375 26.1835 26.5394" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path className="animated-logo-runner" fill-rule="evenodd" clip-rule="evenodd" d="M28.6408 17.4219C30.0921 17.4219 31.25 18.6093 31.25 20.0513C31.25 21.5084 30.1072 22.7344 28.6408 22.7344C27.1701 22.7344 26.0156 21.5127 26.0156 20.0513C26.0156 18.6049 27.1851 17.4219 28.6408 17.4219Z" stroke="white" stroke-width="2"/>
              </svg>

            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center">
        <Image
          src="/images/echologo.svg"
          width={50}
          height={50}
          alt="Logo"
          className="hidden md:block"
        />
      </div> */}
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
