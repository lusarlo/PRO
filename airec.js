const getBtn = document.getElementById("getPrompt");
const prompt = document.getElementById("prompt");
const response = document.getElementById("aiResponse");

const apiKey = "YOUR_API_KEY";
// When the user click the get recommendation button, if the prompt input is empty, show error message.
getBtn.addEventListener("click", async () => {
    const promptText = prompt.value.trim();
    if (!promptText) {
        response.textContent = "Please enter a prompt before requesting recommendations.";
        response.style.color = "red";
        return;
    }
// Show message while waiting for the OpenAI response.
    response.textContent = "Loading recommendations…";
    response.style.color ="black";
// Call the OpenAI Chat Completions API with the chosen model and instructions.
    try {
        const completion = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are an expert librarian that recommend books based on moods, favorite books, authors and genres. You always recommend 4 books." },
                    { role: "user", content: promptText }
                ],
            })
        });

        if (!completion.ok) throw new Error("API error");
// We make the response of the AI visible in the page.
        const data = await completion.json();
        response.textContent = data.choices[0].message.content;
        response.style.color = "black";
// If any error happens the code jumps here and shows an error message. 
    } catch (error) {
        response.textContent = "Something went wrong. Please try again.";
        response.style.color = "red";
    }
});