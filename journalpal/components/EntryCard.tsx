const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  console.log("At entry card", entry);
  console.log("At analysis card", entry.analysis);
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{entry.analysis.subject}</div>
      <div className="px-4 py-4 sm:px-6">{entry.analysis.summary}</div>
    </div>
  );
};

export default EntryCard;
//{entry.anaysis.summary}
// {entry.anaysis.mood}
