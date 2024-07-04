"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageList, MessageProps } from "@/components/messages";
import UserInput from "./user-input";

export interface ChatProps {
  session: any;
}

export default function Chat({ session }: ChatProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    const messageList = document.getElementById("message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  const handleSetPrompt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrompt(e.target.value);
    },
    []
  );

  const setUserMessage = useCallback((message: string) => {
    setMessages((prev) => [...prev, { message, isFromUser: true }]);
  }, []);

  const setAIMessage = useCallback((message: string, index: number) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[index] = { message, isFromUser: false };
      return newMessages;
    });
  }, []);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || isLoading || !session) return;

    setUserMessage(prompt);
    setPrompt("");

    setIsLoading(true);
    const start = Date.now();

    try {
      const stream = await session.promptStreaming(prompt);
      await processStream(stream);
    } catch (error) {
      console.error(error);
      setAIMessage("An error occurred.", messages.length + 1);
    } finally {
      const delta = Date.now() - start;
      finalizeMessages(delta);
      setIsLoading(false);
    }
  };

  const processStream = async (stream: AsyncIterable<string>) => {
    setMessages((prev) => [
      ...prev,
      { message: "Thinking...", isFromUser: false },
    ]);

    for await (const chunk of stream) {
      setAIMessage(chunk, messages.length + 1);
    }
  };

  const finalizeMessages = (delay: number) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      return [...prev.slice(0, prev.length - 1), { ...lastMessage, delay }];
    });
  };

  return (
    <section className="min-h-[90vh] relative flex flex-col gap-y-2 h-full w-full">
      <MessageList messages={messages} />
      <UserInput
        prompt={prompt}
        handleSetPrompt={handleSetPrompt}
        isLoading={isLoading}
        handleClick={handleClick}
      />
    </section>
  );
}
