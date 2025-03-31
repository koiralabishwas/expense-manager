// app/providers/EmotionCacheProvider.tsx
'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// This key must match what MUI uses for SSR
const cache = createCache({ key: 'css', prepend: true });

export function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
