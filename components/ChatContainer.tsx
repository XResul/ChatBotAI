interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

interface ChatContainerProps {
  messages: Message[];
}

export default function ChatContainer({ messages }: ChatContainerProps) {
  return (
    <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col gap-2 mt-15">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded max-w-xs self-start ${
            msg.sender === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-300"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
