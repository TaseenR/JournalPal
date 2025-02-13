import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

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
    return new Response(JSON.stringify({ updatedEntry }));
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to update entry" }));
  }
};
