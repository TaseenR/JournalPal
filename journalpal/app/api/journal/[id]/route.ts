import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  try {
    const user = await getUserByClerkId();
    const data = await request.json();

    const existingEntry = await prisma.journeyEntry.findFirst({
      where: {
        userId: user.id,
        id: params.id,
      },
    });

    if (!existingEntry) {
      return new Response(
        JSON.stringify({ error: "Journal entry not found" }),
        { status: 404 }
      );
    }

    const updatedEntry = await prisma.journeyEntry.update({
      where: { id: existingEntry.id },
      data: data,
    });

    const analysis = await analyse(updatedEntry.content);
    await prisma.analysis.upsert({
      where: {
        entryId: existingEntry.id,
      },
      create: {
        userId: user.id,
        entryId: updatedEntry.id,
        ...analysis,
      },
      update: {
        ...analysis,
      },
    });

    return NextResponse.json({
      data: { ...updatedEntry, analysis: analysis },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to update entry" }));
  }
};
