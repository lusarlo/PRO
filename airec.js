const getBtn = document.getElementById("getPrompt");
const prompt = document.getElementById("prompt");
const response = document.getElementById("aiResponse");

const apiKey = "YOUR_API_KEY";

getBtn.addEventListener("click", async () => {
    const promptText = prompt.value.trim();
    if (!promptText) {
        response.textContent = "Please enter a prompt before requesting recommendations.";
        response.style.color = "red";
        return;
    }

    response.textContent = "Loading recommendations…";
    response.style.color ="black";

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

        const data = await completion.json();
        response.textContent = data.choices[0].message.content;
        response.style.color = "black";

    } catch (error) {
        response.textContent = "Something went wrong. Please try again.";
        response.style.color = "red";
    }
});