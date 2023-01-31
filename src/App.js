/* eslint-disable jsx-a11y/anchor-has-content */
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import './app.css';

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="body">
      <main className="app">
        <div className="main-area">
          <textarea
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt.."
            className="textarea"
          ></textarea>

          <button
            onClick={handleClick}
            disabled={loading || prompt.length === 0}
            className="btn"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <pre className="result">{result}</pre>
        </div>
      </main>
      <p style={{ color: "white", fontSize: "12px", textAlign:"center" }}>Copyright © {new Date().getFullYear()} || all rights reserved by <a style={{  fontWeight:"bold" }} href="https://kbutsho.netlify.app">kbutsho</a> and OpenAI</p>
    </div>
  );
}

export default App;
