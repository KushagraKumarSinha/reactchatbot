import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [...messages, newMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message;
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>Chatbot</h2>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "8px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "8px" }}>
        Send
      </button>
    </div>
  );
};

export default App;
