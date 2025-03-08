import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

// Define default query configuration
const defaultQueryOptions = {
  queries: {
    // How long until data is considered stale (in milliseconds)
    staleTime: 1000 * 60 * 5, // 5 minutes
    // How long to cache data (in milliseconds)
    cacheTime: 1000 * 60 * 30, // 30 minutes
    // Default retry policy
    retry: 3,
    // Exponential backoff for retries
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Automatically refetch when app regains focus
    refetchOnWindowFocus: true,
    // Automatically refetch when reconnected
    refetchOnReconnect: true,
    // Background data refresh on stale data
    refetchOnMount: true,
  },
};

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a client instance for React Query
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: defaultQueryOptions,
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Export the client creation function for testing and other uses
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
}

