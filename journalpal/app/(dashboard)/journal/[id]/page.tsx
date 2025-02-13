import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournalEntry = async (id) => {
  const user = getUserByClerkId();
  const entry = prisma.journeyEntry.findFirst({
    where: {
      userId: user.id,
      id: id,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getJournalEntry(params.id);
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};
export default EntryPage;
