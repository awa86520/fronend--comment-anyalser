import { useState } from "react";

interface SearchBarProps {
  url: string;
  setUrl: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ url, setUrl }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-gray-600 mb-2 text-sm">YouTube URL</p>
      <input
        type="text"
        placeholder="Enter YouTube video link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;

