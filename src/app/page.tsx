"use client";
import Chat from "@/components/chat";
import InitAI from "@/components/init-ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkAiAvailable } from "@/lib/utils";
import { useCallback, useState } from "react";

export default function Home() {
  const [session, setSession] = useState(null);

  const handleInit = useCallback(
    async ({ systemPrompt, topK, temperature }: any) => {
      const isAvailable = await checkAiAvailable();
      if (!isAvailable) return;
      // @ts-ignore
      window.ai
        .createTextSession({ systemPrompt, topK, temperature })
        .then((session: any) => {
          setSession(session);
        });
    },
    []
  );

  if (!session) return <InitAI className="min-h-screen" onInit={handleInit} />;

  return (
    <Tabs
      defaultValue="chat"
      className="relative px-4 md:px-0 flex flex-col py-8 min-h-screen max-h-screen max-w-[120ch] mx-auto items-center"
    >
      <TabsList>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent className="mt-4 w-full" value="chat">
        <Chat session={session} />
      </TabsContent>
      <TabsContent className="w-full" value="settings">
        <InitAI className={"min-h-[90vh]"} onInit={handleInit} />
      </TabsContent>
    </Tabs>
  );
}
