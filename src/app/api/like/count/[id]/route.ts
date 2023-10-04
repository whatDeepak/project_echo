import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  // Extract the user ID from the request parameters
  const postIdToCheck = params.id;

  // Check if the user is already following the target user
  const likes = await prisma.likes.count({
    where: {
      post_id: Number(postIdToCheck)
    },
  });


  return NextResponse.json({ status: 200, data: { likes } });
}
