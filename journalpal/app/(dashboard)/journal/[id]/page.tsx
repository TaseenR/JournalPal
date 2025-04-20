import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournalEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journeyEntry.findFirst({
    where: {
      userId: user.id,
      id: id,
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  if (!params.id) {
    return <div>ERROR: NO ID PROVIDED</div>;
  }
  const entry = await getJournalEntry(params.id);
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};
export default EntryPage;
