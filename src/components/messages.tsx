import { cn } from "@/lib/utils";

export interface MessageProps {
  message: string;
  isFromUser: boolean;
  delay?: number;
}

export function MessageList({ messages }: { messages: MessageProps[] }) {
  return (
    <div
      id="message-list"
      className="w-full max-h-[80dvh] flex-1 overflow-y-auto p-4 flex flex-col gap-y-4"
    >
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
}

export function Message({ message, isFromUser, delay }: MessageProps) {
  return (
    <div
      className={cn(
        "p-4",
        "w-1/2",
        "rounded-lg",
        "shadow-md",
        isFromUser
          ? "bg-primary text-secondary self-end"
          : "bg-secondary text-primary self-start"
      )}
    >
      <p>{message || "No output generated."}</p>
      {!isFromUser && delay && <p className="text-xs text-right">{delay}ms</p>}
    </div>
  );
}
