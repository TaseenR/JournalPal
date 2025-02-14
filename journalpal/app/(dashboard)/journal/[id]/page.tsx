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
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getJournalEntry(params.id);
  console.log;
  const { mood, summary, colour, subject, negative } = entry;
  const analysisData = [
    { name: "Subject", value: subject },
    { name: "Summary", value: summary },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};
export default EntryPage;
