import React, { ComponentProps, Suspense, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useMoniteIframeAppSlots } from '@/hooks/useIframeAppSlots.tsx';
import { ConfigLoader } from '@/lib/ConfigLoader.tsx';
import { EntityIdLoader } from '@/lib/EntityIdLoader.tsx';
import { moniteSuperComponents } from '@/lib/moniteSuperComponents.tsx';
import { css, Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DropInMoniteProvider } from './DropInMoniteProvider';

interface MoniteIframeAppProps
  extends Pick<
    ComponentProps<typeof DropInMoniteProvider>,
    'locale' | 'theme'
  > {}

export const MoniteIframeApp = (props: MoniteIframeAppProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  const { fetchToken } = useMoniteIframeAppSlots();

  useEffect(() => {
    const handleFetchTokenRequest = async (event: MessageEvent) => {
      console.log('handleFetchTokenRequest', event.data.type);

      if (event.data.type === 'fetch-token') {
        try {
          const token = await fetchToken();

          console.log('TOKEN IFRAME', token);

          window.parent.postMessage({ type: 'token-response', token }, '*');
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
    };

    window.addEventListener('message', handleFetchTokenRequest);
    window.parent.postMessage({ type: 'request-token' }, '*'); // Request a token when iframe loads

    return () => {
      window.removeEventListener('message', handleFetchTokenRequest);
    };
  }, [fetchToken]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* ToDo: add a spinner or loader fallback */}
      <Suspense fallback={'Loading...'}>
        <ConfigLoader>
          {({ apiUrl, appBasename }) => (
            <EntityIdLoader fetchToken={fetchToken} apiUrl={apiUrl}>
              {(entityId) => (
                <MoniteIframeAppComponent
                  {...props}
                  entityId={entityId}
                  apiUrl={apiUrl}
                  fetchToken={fetchToken}
                  basename={appBasename}
                />
              )}
            </EntityIdLoader>
          )}
        </ConfigLoader>
      </Suspense>
    </QueryClientProvider>
  );
};

export const MoniteIframeAppComponent = ({
  theme,
  locale,
  basename,
  apiUrl,
  entityId,
  fetchToken,
}: MoniteIframeAppProps & {
  apiUrl: string;
  entityId: string;
  basename: string;
  fetchToken: () => Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }>;
}) => {
  return (
    <DropInMoniteProvider
      locale={locale}
      theme={theme}
      sdkConfig={{
        entityId,
        apiUrl,
        fetchToken,
      }}
    >
      <Global
        styles={css`
          :root,
          :host {
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            isolation: isolate;
          }
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
        `}
      />
      <BrowserRouter basename={basename}>
        <Routes>
          {Object.entries(moniteSuperComponents).map(([path, Component]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <Suspense fallback={null /** add a fallback **/}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </DropInMoniteProvider>
  );
};
