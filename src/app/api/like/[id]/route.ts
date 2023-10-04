import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

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
  const isLiked = await prisma.likes.findFirst({
    where: {
      user_id: Number(session.user?.id),
      post_id: Number(postIdToCheck),
    },
  });

  // Determine the follow status based on the query result
  const likeStatus = isLiked ? "1" : "0";

  return NextResponse.json({ status: 200, data: { likeStatus } });
}
