import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CreateUrlSchema, CreateUrlInput, createShortUrl, UrlItem } from '../api/urls';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { Link, Sparkles } from 'lucide-react';

interface UrlFormProps {
  onUrlCreated: (url: UrlItem) => void;
}

export const UrlForm = ({ onUrlCreated }: UrlFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUrlInput>({
    resolver: zodResolver(CreateUrlSchema),
  });

  const onSubmit = async (data: CreateUrlInput) => {
    setIsLoading(true);
    try {
      const response = await createShortUrl(data);
      if (response.success) {
        onUrlCreated(response.data);
        reset();
        toast.success('URL shortened successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            New Short Link
        </CardTitle>
        <CardDescription>Paste your long URL to create a short link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="https://example.com/very/long/url"
                className="pl-9"
                error={errors.originalUrl?.message}
                {...register('originalUrl')}
                />
            </div>
          </div>
          <div className="md:w-48">
            <Input
              placeholder="Custom alias (opt)"
              error={errors.customCode?.message}
              {...register('customCode')}
            />
          </div>
          <Button type="submit" isLoading={isLoading} className="md:w-32">
            Shorten
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
