"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Query = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("HANDLE SUBMIT RUNNING");
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          placeholder="Ask a question"
          type="text"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg mx-4"
          type="submit"
          disabled={loading}
        >
          Ask Away!
        </button>
      </form>
      {loading && <div>...loading</div>}
      {/* {response && <div>{response}</div>} */}
    </div>
  );
};

export default Query;
