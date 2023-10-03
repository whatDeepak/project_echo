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

  // Check if the user is already following the target user
  const followers = await prisma.follow.count({
    where: {
      followingId: Number(session.user?.id)
    },
  });
  const following = await prisma.follow.count({
    where: {
      followerId: Number(session.user?.id)
    },
  });


  return NextResponse.json({ status: 200, data: { followers , following } });
}
