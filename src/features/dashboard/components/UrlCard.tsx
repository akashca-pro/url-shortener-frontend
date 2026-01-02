import { useState } from 'react';
import { UrlItem, deleteUrl } from '../api/urls';
import { Card, CardContent } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Copy, Trash2, ExternalLink, BarChart2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';

interface UrlCardProps {
  url: UrlItem;
  onDelete: (id: string) => void;
}

export const UrlCard = ({ url, onDelete }: UrlCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url.shortUrl);
    toast.success('Copied to clipboard');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this URL?')) return;
    
    setIsDeleting(true);
    try {
      await deleteUrl(url.id);
      onDelete(url.id);
      toast.success('URL deleted successfully');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to delete URL'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <a 
                href={url.shortUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-xl font-semibold text-primary hover:underline truncate"
              >
                {url.shortUrl}
              </a>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={copyToClipboard}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground truncate max-w-md">
              {url.originalUrl}
            </p>
            
            <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <BarChart2 className="h-3 w-3" />
                    {url.clickCount} clicks
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(url.createdAt).toLocaleDateString()}
                </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a 
              href={url.originalUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-3 text-xs border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit
            </a>
            <Button 
                size="sm" 
                variant="destructive" 
                onClick={handleDelete} 
                isLoading={isDeleting}
                className="w-9"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
