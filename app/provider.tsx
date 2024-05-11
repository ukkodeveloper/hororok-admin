'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
