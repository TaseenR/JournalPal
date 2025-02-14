"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setSaving] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const { mood, summary, colour, subject, negative } = analysis;
  const analysisData = [
    { name: "Subject", value: subject },
    { name: "Summary", value: summary },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];
  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return;
      setisLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setAnalysis(updated.analysis);
      setisLoading(false);
    },
  });

  return isLoading ? (
    <div>...Loading</div>
  ) : (
    <div className="w-full h-full  grid grid-cols-3">
      <textarea
        className="w-full h-full p-8 text-xl col-span-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="border-l border col-span-1">
        <div className="px-6 py-10" style={{ backgroundColor: colour }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between borer-b border-t border-black/10"
              >
                <span className="font-semibold text-lg">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
