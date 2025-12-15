const getBtn = document.getElementById("getPrompt");
const prompt = document.getElementById("prompt");
const response = document.getElementById("aiResponse");

const openai = new OpenAI({
  apiKey: 'your-api-key-here',
});

getBtn.addEventListener("click", async () => {

    const promptText = prompt.value;

    if(!promptText) {
        response.textContent = "Please enter a prompt.";
        return;
    }

    response.textContent = "Loading recommendations...";

    const messages = [
        {
            role: "system",
            content: "You are an expert librarian, that can recommends books based on moods, favorite genres and authors. You will always recommend 5 books."
        },
        {
            role: "user",
            content: promptText
        }
    ]

    try {
        const completion = await openai.completions.create({
        model: "GPT-4.1 mini",
        messages: messages,
        max_tokens: 150
        });
        if (!completion.ok) throw new Error("API error");

        const data = await completion.json();
        response.textContent = data.choices[0].message.content;

        } 
    
    catch (error) {
        responseBox.textContent = 
            "Something went wrong. Please try again.";
         }
});