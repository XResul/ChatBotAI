interface InputBarProps {
  input: string;
  setInput: (val: string) => void;
  sendMessage: (text: string) => void;
}

export default function InputBar({
  input,
  setInput,
  sendMessage,
}: InputBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-300 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Mesaj yaz..."
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={() => {
          if (input.trim() === "") return;
          sendMessage(input.trim());
          setInput("");
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Gönder
      </button>
    </div>
  );
}
