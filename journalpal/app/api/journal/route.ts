import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const user = await getUserByClerkId();
    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    let entry;
    try {
      entry = await prisma.journeyEntry.create({
        data: {
          userId: user.id,
          content: "Write about anything and everything",
        },
      });
    } catch (error) {
      console.error("Error creating journal entry:", error);
      return NextResponse.json(
        { error: "Failed to create journal entry" },
        { status: 500 }
      );
    }

    const analysis = {
      mood: "Unknown",
      summary: "No summary available",
      colour: "#ffffff",
      subject: "Unknown",
      negative: false,
      sentimentScore: 0,
    };

    try {
      await prisma.analysis.create({
        data: {
          userId: user.id,
          entryId: entry.id,
          ...analysis,
        },
      });
    } catch (error) {
      console.error("Error creating analysis entry:", error);
      return NextResponse.json(
        { error: "Failed to create analysis entry" },
        { status: 500 }
      );
    }

    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
