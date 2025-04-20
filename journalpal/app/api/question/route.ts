import { query } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  console.log("POST RUNNING");
  const { question } = await request.json();
  const user = await getUserByClerkId();

  const entries = await prisma.journeyEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await query(question, entries);

  return NextResponse.json({ data: answer });
};
//Sum up how my mood has been as of recent and tell me why
