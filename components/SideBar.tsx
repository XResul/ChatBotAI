import { MessageCircle, Settings, User, Plus, Menu } from "lucide-react";

interface Chat {
  id: number;
  title: string;
}

interface SidebarProps {
  activeChat: number | null;
  setActiveChat: (id: number) => void;
  chats: Chat[];
  addNewChat: () => void;
  deleteChat: (id: number) => void;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeChat,
  setActiveChat,
  chats,
  addNewChat,
  isMobile,
  deleteChat,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#095f79] text-white flex flex-col transition-transform duration-500 z-50
        ${
          isMobile
            ? isSidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : "translate-x-0 w-64"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold truncate">ChatBot AI</h1>

        {/* Mobilde kapatma butonu */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer"
          >
            {/* Hamburgermenusyaptım */}
            <Menu />
          </button>
        )}
      </div>

      {/* Yeni Sohbet */}
      <button
        onClick={addNewChat}
        className="flex items-center gap-2 p-2 m-2 bg-green-500 rounded hover:bg-green-600 transition-colors"
      >
        <Plus /> Yeni Sohbet
      </button>

      {/* Mesaj geçmişi */}
      <nav className="flex flex-col mt-2 px-2 flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div key={chat.id} className="flex flex-row space-x-5 space-y-1">
            <button
              key={chat.id}
              onClick={() => {
                setActiveChat(chat.id);
                if (isMobile) setIsSidebarOpen(!isSidebarOpen);
              }}
              className={`flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                activeChat === chat.id ? "bg-blue-700" : ""
              }`}
            >
              <MessageCircle />
              {chat.title}
            </button>
            <button
              onClick={() => deleteChat(chat.id)}
              className=" text-red-400 text-lg rounded-2xl w-20"
            >
              Sil
            </button>
          </div>
        ))}

        <a
          href="#"
          className="flex items-center gap-3 mt-4 p-2 rounded hover:bg-blue-600"
        >
          <User /> Profile
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-600"
        >
          <Settings /> Settings
        </a>
      </nav>
    </div>
  );
}
