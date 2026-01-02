import { useEffect, useState } from 'react';
import { UrlItem, getMyUrls } from '../api/urls';
import { UrlForm } from '../components/UrlForm';
import { UrlCard } from '../components/UrlCard';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const DashboardPage = () => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await getMyUrls();
      if (response.success) {
        setUrls(response.data.urls);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch URLs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlCreated = (newUrl: UrlItem) => {
    setUrls([newUrl, ...urls]);
  };

  const handleUrlDeleted = (deletedId: string) => {
    setUrls(urls.filter((url) => url.id !== deletedId));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">     
      <UrlForm onUrlCreated={handleUrlCreated} />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Your Links</h2>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : urls.length > 0 ? (
          <div className="grid gap-4">
            {urls.map((url) => (
              <UrlCard key={url.id} url={url} onDelete={handleUrlDeleted} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-lg bg-card text-muted-foreground">
            No links created yet. Create your first short link above!
          </div>
        )}
      </div>
    </div>
  );
};
