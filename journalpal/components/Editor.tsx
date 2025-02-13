"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setSaving] = useState();
  const [isLoading, setisLoading] = useState(false);
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setisLoading(true);
      updateEntry(entry.id, _value);
      setisLoading(false);
    },
  });

  return isLoading ? (
    <div>...Loading</div>
  ) : (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
