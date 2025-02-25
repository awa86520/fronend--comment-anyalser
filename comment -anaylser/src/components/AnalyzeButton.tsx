interface AnalyzeButtonProps {
    onAnalyze: () => void;
  }
  
  const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onAnalyze }) => {
    return (
      <button
        onClick={onAnalyze}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Analyze Comments
      </button>
    );
  };
  
  export default AnalyzeButton;
  