import { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, X } from "lucide-react";

export default function AccessManagement({ authorId }) {
  const [accessList, setAccessList] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchAccess = async () => {
      const { data } = await supabase
        .from('author_access')
        .select('*')
        .eq('author_id', authorId);
      setAccessList(data || []);
    };
    fetchAccess();
  }, [authorId]);

  const handleAdd = async () => {
    if (!newEmail) return;
    await supabase.from('author_access').insert({ author_id: authorId, email: newEmail });
    setNewEmail("");
    const { data } = await supabase.from('author_access').select('*').eq('author_id', authorId);
    setAccessList(data || []);
  };

  const handleRemove = async (id) => {
    await supabase.from('author_access').delete().eq('id', id);
    setAccessList(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-red-600" />
        <h4 className="font-semibold text-sm">Portal Access</h4>
      </div>
      <div className="flex gap-2 mb-3">
        <Input
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Grant access by email"
          className="text-sm h-8"
        />
        <Button size="sm" onClick={handleAdd}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {accessList.map(a => (
          <Badge key={a.id} variant="secondary" className="flex items-center gap-1">
            {a.email}
            <button onClick={() => handleRemove(a.id)} className="ml-1 hover:text-red-600">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
