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
    <Card className="hover:bg-muted/50 transition-colors overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* URL Info Section */}
          <div className="min-w-0 space-y-2">
            {/* Short URL */}
            <div className="flex items-center gap-2 min-w-0">
              <a 
                href={url.shortUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-base sm:text-xl font-semibold text-primary hover:underline truncate block"
              >
                {url.shortUrl}
              </a>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0 shrink-0" 
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {/* Original URL */}
            <p 
              className="text-xs sm:text-sm text-muted-foreground break-all line-clamp-2"
              title={url.originalUrl}
            >
              {url.originalUrl}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <BarChart2 className="h-3 w-3 shrink-0" />
                <span>{url.clickCount} clicks</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 shrink-0" />
                <span>{new Date(url.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex gap-2 pt-2 border-t border-border sm:border-0 sm:pt-0 sm:self-end">
            <a 
              href={url.originalUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-3 text-xs border border-input bg-background hover:bg-accent hover:text-accent-foreground flex-1 sm:flex-none"
            >
              <ExternalLink className="h-4 w-4 mr-2 shrink-0" />
              <span>Visit</span>
            </a>
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={handleDelete} 
              isLoading={isDeleting}
              className="h-9 w-9 p-0 shrink-0"
              title="Delete URL"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
