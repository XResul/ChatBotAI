// HomePage.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../../components/SideBar";
import ChatContainer from "../../components/ChatContainer";
import InputBar from "../../components/InputBar";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

interface Chat {
  id: number;
  title: string;
}

export default function HomePage() {
  const [chats, setChats] = useState<Chat[]>([{ id: 1, title: "Sohbet 1" }]);
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (id: number) => {
    setChats(chats.filter((c) => c.id !== id));
  };

  useEffect(() => {
    if (activeChat !== null) {
      const saved = localStorage.getItem(`chat-${activeChat}`);
      if (saved) setMessages(JSON.parse(saved));
      else setMessages([]);
    }
  }, [activeChat]);

  useEffect(() => {
    if (activeChat !== null) {
      localStorage.setItem(`chat-${activeChat}`, JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: `Bot cevap: "${text}"`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const addNewChat = () => {
    const newId = Date.now();
    const newChat: Chat = { id: newId, title: `Sohbet ${chats.length + 1}` };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(newId);
  };

  return (
    <div className="flex h-screen relative">
      {/* Hamburger icon - sadece mobil */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 bg-[#095f79] p-2 rounded"
        >
          <Menu className="text-white" />
        </button>
      )}

      <Sidebar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chats={chats}
        addNewChat={addNewChat}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        deleteChat={handleDelete}
      />

      {/* Chat alanı */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-64"
        }`}
      >
        <ChatContainer messages={messages} />
        <InputBar input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
