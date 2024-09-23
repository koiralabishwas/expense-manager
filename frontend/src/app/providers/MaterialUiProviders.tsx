import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export function MaterialUiProviders({ children }: { children: React.ReactNode }) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
}
