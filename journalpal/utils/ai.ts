import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import z from "zod";
import { PromptTemplate } from "@langchain/core/prompts";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry."),
    summary: z.string().describe("a short summary of the journal entry."),
    subject: z.string().describe("The subject of the journal entry."),
    colour: z
      .string()
      .describe(
        "a hexidecimal colour code that represents the mood of the entry. e.g. #028a0f would be happy and #b80f0a would be angry etc."
      ),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? does the writer show negative emotions"
      ),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on as scale from -100 to 100 where -100 is extremely negative"
      ),
  })
);

const getPrompt = async (content) => {
  const formatedInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyse the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatedInstructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formatedInstructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log(input);

  return input;
};

export const analyse = async (content) => {
  const input = await getPrompt(content);
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const messages = [{ role: "user", content: input }];
  const result = await model.invoke(messages);

  try {
    return parser.parse(result.content);
  } catch (error) {
    console.log(error);
  }
};

export const query = async (question, entries) => {
  console.log("QUERY RUNNING");

  //   const docs = entries.map(
  //     (entry) =>
  //       new Document({
  //         pageContent: entry.content,
  //         metadata: { id: entry.entryId, createdAt: entry.createdAt },
  //       })
  //   );

  //   const model = new ChatOpenAI({
  //     temperature: 0,
  //     modelName: "gpt-3.5-turbo",
  //   });

  //   const embeddings = new OpenAIEmbeddings();
  //   const store = await Chroma.fromDocuments(docs, embeddings, {
  //     collectionName: "my_journals",
  //   });

  //   const retriever = store.asRetriever();
  //   const relDocs = await retriever.getRelevantDocuments(question);

  //   const chain = RetrievalQAChain.fromChain(model, { retriever });

  //   const res = await chain.call({
  //     input_documents: relDocs,
  //     question,
  //   });

  //   return res;
};
