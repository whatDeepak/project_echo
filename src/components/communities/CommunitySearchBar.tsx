"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateCommunity from "../common/CreateCommunity";

export default function CommunitySearchBar() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/communities/discover?query=${query}`);
  };
  return (
    <div className="mt-5">
      <form onSubmit={submit}>
        <input
          type="search"
          className="w-full rounded-2xl h-14 p-3 bg-muted outline-none"
          placeholder="Search communities with their name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
