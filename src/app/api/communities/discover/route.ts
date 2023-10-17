import prisma from "@/DB/db.config";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }
  const query = request.nextUrl.searchParams.get("query");
  const users = await prisma.community.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query ?? "",
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: query ?? "",
            mode: "insensitive",
          },
        },
      ],
      NOT: {
        id: Number(session.user?.id),
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
    },
  });

  return NextResponse.json({ status: 200, data: users });
}
