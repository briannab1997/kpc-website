import { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

export default function StaffMessaging({ author, staffUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('staff_messages')
        .select('*')
        .eq('author_id', author.id)
        .order('created_at');
      setMessages(data || []);
    };
    fetchMessages();
  }, [author.id]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await supabase.from('staff_messages').insert({
      author_id: author.id,
      sender_email: staffUser?.email || "staff",
      message: newMessage,
    });
    setNewMessage("");
    const { data } = await supabase
      .from('staff_messages')
      .select('*')
      .eq('author_id', author.id)
      .order('created_at');
    setMessages(data || []);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-red-600" />
        <h4 className="font-semibold text-sm">Staff Notes & Messages</h4>
      </div>
      <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
        {messages.length === 0 ? (
          <p className="text-xs text-gray-400">No messages yet.</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="text-xs bg-gray-50 rounded p-2">
              <span className="font-medium text-gray-600">{m.sender_email}:</span> {m.message}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add a note..."
          className="text-sm min-h-0 h-16"
          rows={2}
        />
        <Button size="sm" onClick={handleSend} className="self-end">Send</Button>
      </div>
    </div>
  );
}
