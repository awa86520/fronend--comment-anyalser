
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import AnalyzeButton from "../components/AnalyzeButton";

const Home = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    let trimmedUrl = url.trim(); //
    if (!trimmedUrl) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    trimmedUrl = trimmedUrl.split("?")[0];
   

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/comments?videoUrl=${encodeURIComponent(trimmedUrl)}`, {
        method: "GET", //
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ videoUrl: trimmedUrl }),
      });

      const textData = await response.text(); 

      
      let data;
      try {
        data = JSON.parse(textData);
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${textData.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || `Server Error: ${response.status}`);
      }

      setResult(JSON.stringify(data, null, 2));
      console.log("data successfull")
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Failed to analyze comments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Comment Analyzer</h1>
      <SearchBar url={url} setUrl={setUrl} />
     
     
      <AnalyzeButton onAnalyze={handleAnalyze} />

      {loading && <p className="text-blue-500 mt-4">Analyzing comments...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* {result && (
        <pre className="mt-4 p-4 bg-gray-100 border rounded-md text-sm w-full max-w-lg">
          {result}
        </pre> */}
    </div>
  );
};

export default Home;

