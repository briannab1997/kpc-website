import { useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthorAIAssistant({ authorRecord, phases, authorTasks, workflowTasks, currentPhase, overallProgress, getPhaseStatus, calculatePhaseProgress }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userMessage = question.trim();
    setQuestion("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 800));
    setMessages(prev => [...prev, {
      role: "assistant",
      content: "Thank you for your question! Our publishing team will be able to provide you with detailed guidance. In the meantime, please feel free to reach out via the Messages tab or contact us at kentishpublishing@gmail.com."
    }]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-gray-200">
        <Sparkles className="w-10 h-10 text-red-600 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-gray-900">Publishing Assistant</h2>
        <p className="text-gray-500 text-sm mt-1">Ask questions about your publishing journey</p>
      </div>

      <div className="space-y-4 min-h-[200px]">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 py-12">Ask a question to get started</p>
        )}
        {messages.map((msg, i) => (
          <Card key={i} className={msg.role === "user" ? "ml-8 bg-red-50 border-red-100" : "mr-8"}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">{msg.content}</p>
            </CardContent>
          </Card>
        ))}
        {isLoading && (
          <Card className="mr-8">
            <CardContent className="p-4">
              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            </CardContent>
          </Card>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask about your publishing timeline, next steps, or general questions..."
          className="resize-none"
          rows={2}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
        />
        <Button type="submit" disabled={!question.trim() || isLoading} className="bg-red-600 hover:bg-red-700 self-end">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
