import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const users = await prisma.community.findMany({
    where: {
        // @ts-ignore
        created_by: String(session.user?.username),
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio:true,
    },
    orderBy: {
      id: "desc",
    },
  });
  
  return NextResponse.json({ status: 200, data: users });
}
