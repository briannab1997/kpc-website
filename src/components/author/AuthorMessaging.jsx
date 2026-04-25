import { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthorMessaging({ authorRecord, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authorRecord) return;
    fetchMessages();
  }, [authorRecord]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("author_messages")
      .select("*")
      .eq("author_id", authorRecord.id)
      .order("created_at");
    setMessages(data || []);
    setIsLoading(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;
    setIsSending(true);
    await supabase.from("author_messages").insert({
      author_id: authorRecord.id,
      sender_email: user.email,
      content: newMessage.trim(),
      is_from_author: true,
    });
    setNewMessage("");
    await fetchMessages();
    setIsSending(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 min-h-[200px] max-h-[400px] overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 py-12">No messages yet. Send a message to your publishing team.</p>
        )}
        {messages.map((msg) => (
          <Card
            key={msg.id}
            className={msg.is_from_author ? "ml-8 bg-red-50 border-red-100" : "mr-8"}
          >
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">{msg.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {msg.is_from_author ? "You" : "Kentish Publishing"} &middot;{" "}
                {new Date(msg.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-3">
        <Textarea
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Message your publishing team..."
          className="resize-none"
          rows={2}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
        />
        <Button type="submit" disabled={!newMessage.trim() || isSending} className="bg-red-600 hover:bg-red-700 self-end">
          {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
}
