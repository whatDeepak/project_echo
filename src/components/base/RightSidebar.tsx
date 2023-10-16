import { Suspense } from "react";
import UserListCard from "../common/UserListCard";
import { fetchCommunities, fetchUsers } from "@/lib/serverMethods";
import CommunityListCard from "../common/CommunityListCard";

export default async function RightSidebar() {
  const users: Array<User> | [] = await fetchUsers();
  const communities: Array<Community> | [] = await fetchCommunities();
  return (
    <div className="h-screen border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block">
      <div className="">
        <h1 className="text-xl font-bold">Suggested Users</h1>
      </div>
      <div className="mt-5">
        {users.map((item) => (
          <UserListCard user={item} key={item.id} />
        ))}
      </div>
      <div className="">
        <h1 className="text-xl font-bold">Suggested Communities</h1>
      </div>
      <div className="mt-5">
        {communities.map((item) => (
          <CommunityListCard community={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
