"use client";

import { useState } from "react";

const Query = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form action="">
        <input
          onChange={onChange}
          value={value}
          placeholder="Ask a question"
          type="text"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg mx-4"
          type="submit"
        >
          Ask Away!
        </button>
      </form>
    </div>
  );
};

export default Query;
