import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { communityregisterSchema, registerSchema } from "@/validators/authSchema";
import prisma from "@/DB/db.config";
import bcrypt from "bcryptjs";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(communityregisterSchema);
    const payload = await validator.validate(body);

    // * Check username if it already exist
    const isUsernameExist = await prisma.community.findUnique({
        where: {
          username: payload.username,
        },
        select: {
          id: true,
        },
    });
  
    if (isUsernameExist) {
        return NextResponse.json({
          status: 400,
          errors: {
            username: "Username already taken. Please use another Username.",
          },
        });
    }

    const isEmailExist = await prisma.community.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
        },
    });
  
    if (isEmailExist) {
        return NextResponse.json({
          status: 400,
          errors: {
            email: "Email already taken. please use another email.",
          },
        });
    }

    // * Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    await prisma.community.create({ data: payload });
    return NextResponse.json({
      status: 200,
      message: "Account created successfully.Please login into your account!",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
