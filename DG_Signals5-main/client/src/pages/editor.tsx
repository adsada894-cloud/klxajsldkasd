import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Save, FileCode, Eye, Replace } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FileInfo {
  path: string;
  isEditable: boolean;
}

interface SearchResult {
  file: string;
  line: number;
  content: string;
  match: string;
}

export default function EditorPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const { toast } = useToast();

  const { data: files = [] } = useQuery<FileInfo[]>({
    queryKey: ['/api/files']
  });

  const { data: currentFile } = useQuery({
    queryKey: ['/api/file', selectedFile],
    enabled: !!selectedFile,
    queryFn: async () => {
      const response = await fetch(`/api/file?path=${encodeURIComponent(selectedFile!)}`);
      if (!response.ok) throw new Error('Failed to load file');
      const data = await response.json();
      setFileContent(data.content);
      return data;
    }
  });

  const { data: searchResults = [] } = useQuery<SearchResult[]>({
    queryKey: ['/api/search', searchQuery],
    enabled: searchQuery.length > 2
  });

  const saveMutation = useMutation({
    mutationFn: async (data: { path: string; content: string }) => {
      return apiRequest('POST', '/api/file', data);
    },
    onSuccess: () => {
      toast({ title: 'Saved!', description: 'File saved successfully' });
      queryClient.invalidateQueries({ queryKey: ['/api/file'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to save file', variant: 'destructive' });
    }
  });

  const handleSave = () => {
    if (selectedFile) {
      saveMutation.mutate({ path: selectedFile, content: fileContent });
    }
  };

  const handleReplace = () => {
    if (searchQuery && replaceText) {
      const newContent = fileContent.replace(new RegExp(searchQuery, 'g'), replaceText);
      setFileContent(newContent);
      toast({ title: 'Replaced', description: `Replaced "${searchQuery}" with "${replaceText}"` });
    }
  };

  const componentFiles = files.filter(f => 
    f.path.includes('client/src/components/') && f.path.endsWith('.tsx')
  );

  const telegramFiles = searchResults.filter(r => 
    r.content.toLowerCase().includes('telegram')
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-semibold">VictoryPipsFX Website Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          {selectedFile && (
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={saveMutation.isPending}
              data-testid="button-save"
            >
              <Save className="w-4 h-4 mr-2" />
              {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* File Browser */}
        <div className="w-64 border-r bg-card flex flex-col">
          <div className="p-3 border-b">
            <h2 className="font-semibold text-sm mb-2">Components</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                data-testid="input-search"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {searchQuery.length > 2 && telegramFiles.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                    Telegram Links Found ({telegramFiles.length})
                  </div>
                  {telegramFiles.slice(0, 10).map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFile(result.file)}
                      className="w-full text-left px-2 py-1.5 hover-elevate active-elevate-2 rounded-md mb-1"
                      data-testid={`file-${result.file.replace(/\//g, '-')}`}
                    >
                      <div className="text-xs font-medium truncate">{result.file.split('/').pop()}</div>
                      <div className="text-xs text-muted-foreground truncate">Line {result.line}</div>
                    </button>
                  ))}
                </div>
              )}
              
              {!searchQuery && componentFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file.path)}
                  className={`w-full text-left px-2 py-1.5 hover-elevate active-elevate-2 rounded-md mb-1 ${
                    selectedFile === file.path ? 'bg-accent' : ''
                  }`}
                  data-testid={`file-${file.path.replace(/\//g, '-')}`}
                >
                  <div className="text-sm truncate">{file.path.split('/').pop()}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {file.path.replace('client/src/components/', '')}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Editor & Preview */}
        <div className="flex-1 flex flex-col">
          {selectedFile ? (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="border-b px-4 py-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge variant="secondary">{selectedFile.split('/').pop()}</Badge>
                      <span className="text-xs text-muted-foreground truncate">{selectedFile}</span>
                    </div>
                    <TabsList>
                      <TabsTrigger value="edit" data-testid="tab-edit">
                        <FileCode className="w-4 h-4 mr-2" />
                        Edit
                      </TabsTrigger>
                      <TabsTrigger value="preview" data-testid="tab-preview">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="edit" className="flex-1 m-0 p-0 overflow-hidden">
                  <div className="flex flex-col h-full">
                    <div className="border-b p-2 flex items-center gap-2">
                      <Input
                        placeholder="Find text..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-xs"
                        data-testid="input-find"
                      />
                      <Input
                        placeholder="Replace with..."
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        className="max-w-xs"
                        data-testid="input-replace"
                      />
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={handleReplace}
                        disabled={!searchQuery || !replaceText}
                        data-testid="button-replace"
                      >
                        <Replace className="w-4 h-4 mr-2" />
                        Replace All
                      </Button>
                    </div>
                    <ScrollArea className="flex-1">
                      <textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        className="w-full h-full min-h-[600px] p-4 font-mono text-sm bg-background resize-none focus:outline-none"
                        spellCheck={false}
                        data-testid="textarea-editor"
                      />
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="flex-1 m-0 p-0 overflow-hidden">
                  <div className="h-full bg-muted/30 p-4">
                    <Card className="h-full">
                      <iframe
                        src="/preview/index.html"
                        className="w-full h-full border-0"
                        title="Website Preview"
                        data-testid="iframe-preview"
                      />
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Select a file to edit</p>
                <p className="text-sm">Choose a component from the left sidebar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
