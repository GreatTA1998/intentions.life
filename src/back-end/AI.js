import OpenAI from "openai";
console.log('new version, can you see this? also env: ', import.meta.env)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_PUBLIC_BROWSER_NAME,
  dangerouslyAllowBrowser: true
});

export async function helloWorld() {
  console.log("env is: ", import.meta.env.VITE_PUBLIC_BROWSER_NAME);
  console.log("running hello world");
  const chatCompletion = await openai.chat.completions
    .create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-4o-mini",
    })
    .catch(console.error);
  console.log("responded with", chatCompletion.choices[0].message);
}
