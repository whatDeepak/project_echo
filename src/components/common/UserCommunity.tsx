import { Suspense } from "react";
import UserListCard from "../common/UserListCard";
import { fetchUserCommunities } from "@/lib/serverMethods";
import CommunityListCard from "../common/CommunityListCard";
import UserCommunityListCard from "./UserCommunityListCard";

export default async function UserCommunity() {
  const communities: Array<Community> | [] = await fetchUserCommunities();
  return (
      <div className="mt-5">
        {communities.map((item) => (
          <UserCommunityListCard community={item} key={item.id} />
        ))}
      </div>
  );
}
