const createURL = (path) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    })
  );

  console.log("Response Status: ", res.status);
  if (res.ok) {
    const data = await res.json();
    console.log("Data inside the API call: ", data, " and the ID: ", data.id);
    return data.data;
  } else {
    console.log("POST failed CreateNewEntry");
  }
};

export const askQuestion = async (question) => {
  console.log("ASK QUESTION API CALL");
  const res = await fetch(
    new Request(createURL("/api/question"), {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const createNewAnalysis = async (id, content) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)));
};
export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
