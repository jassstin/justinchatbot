import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a fun, encouraging chatbot who talks in a casual Singaporean tone." },
                { role: "user", content: userMessage }
            ]
        })
    });

    const data = await response.json();
    res.json(data.choices[0].message);
});

app.listen(3000, () => console.log("Server running on port 3000"));
