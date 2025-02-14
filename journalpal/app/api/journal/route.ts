import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journeyEntry.create({
    data: {
      userId: user.id,
      content: "Write about anything and everything",
    },
  });

  const analysis = await analyse(entry.content);
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};
