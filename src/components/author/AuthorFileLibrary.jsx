import { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";
import { Folder, Download, Loader2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthorFileLibrary({ authorRecord, user }) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authorRecord) return;
    fetchFiles();
  }, [authorRecord]);

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("author_files")
      .select("*")
      .eq("author_id", authorRecord.id)
      .order("created_at", { ascending: false });
    setFiles(data || []);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-red-600" />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-16">
        <Folder className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <p className="text-gray-500">No files shared yet.</p>
        <p className="text-gray-400 text-sm mt-1">Files shared by your publishing team will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {files.map((file) => (
        <Card key={file.id} className="border-red-100">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{file.file_name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(file.created_at).toLocaleDateString()}
                  {file.description && ` - ${file.description}`}
                </p>
              </div>
            </div>
            {file.file_url && (
              <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
