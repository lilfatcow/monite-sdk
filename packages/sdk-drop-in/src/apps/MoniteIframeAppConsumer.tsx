import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { ConfigLoader } from '@/lib/ConfigLoader';
import { EntityIdLoader } from '@/lib/EntityIdLoader';
import { fetchTokenDev } from '@/lib/fetchTokenDev';
import { MoniteIframeAppCommunicator } from '@/lib/MoniteIframeAppCommunicator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DefaultLayout,
  getThemeOptions,
  SDKDemoAPIProvider,
  SDKDemoI18nProvider,
  useThemeConfig,
} from '@team-monite/sdk-demo';

export const MoniteIframeAppConsumer = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <ConfigLoader>
          {({ apiUrl, appBasename, appHostname }) => (
            <EntityIdLoader apiUrl={apiUrl} fetchToken={fetchTokenDev}>
              {(entityId) => (
                <SDKDemoAPIProvider
                  apiUrl={apiUrl}
                  entityId={entityId}
                  fetchToken={fetchTokenDev}
                >
                  <MoniteIframeAppConsumerComponent
                    appBasename={appBasename}
                    appHostname={appHostname}
                    fetchToken={fetchTokenDev}
                  />
                </SDKDemoAPIProvider>
              )}
            </EntityIdLoader>
          )}
        </ConfigLoader>
      </Suspense>
    </QueryClientProvider>
  );
};

const MoniteIframeAppConsumerComponent = ({
  appBasename,
  appHostname,
  fetchToken,
}: {
  appBasename: string;
  appHostname: string;
  fetchToken: FetchTokenHandler;
}) => {
  const { themeConfig, setThemeConfig } = useThemeConfig();

  const localeCode = 'en-US';
  return (
    <ThemeProvider theme={createTheme(getThemeOptions(themeConfig))}>
      <CssBaseline enableColorScheme />
      <SDKDemoI18nProvider localeCode={localeCode}>
        <BrowserRouter basename={location.pathname.split('/')[1]}>
          <DefaultLayout
            themeConfig={themeConfig}
            setThemeConfig={setThemeConfig}
          >
            <Routes>
              <Route
                path="*"
                element={
                  <MoniteIframe
                    appBasename={appBasename}
                    appHostname={appHostname}
                    fetchToken={fetchToken}
                    localeCode={localeCode}
                    themeConfig={themeConfig}
                  />
                }
              />
            </Routes>
          </DefaultLayout>
        </BrowserRouter>
      </SDKDemoI18nProvider>
    </ThemeProvider>
  );
};

const MoniteIframe = ({
  appHostname,
  appBasename,
  localeCode,
  fetchToken,
  themeConfig,
}: {
  appHostname: string;
  appBasename: string;
  localeCode: string;
  fetchToken: FetchTokenHandler;
  themeConfig: ReturnType<typeof useThemeConfig>['themeConfig'];
}) => {
  const portSegment = location.port ? `:${location.port}` : '';
  const { pathname } = useLocation();
  const iframeUrl = `//${appHostname}${portSegment}/${appBasename}${pathname}`;

  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  );

  const channelPortManager = useMemo(() => {
    return iframeElement && new MoniteIframeAppCommunicator(iframeElement);
  }, [iframeElement]);

  useEffect(() => {
    if (!channelPortManager) return;
    channelPortManager.mountSlot('fetch-token', fetchToken);
    channelPortManager.mountSlot('locale', { code: localeCode });
    channelPortManager.mountSlot('theme', getThemeOptions(themeConfig));

    return () => {
      channelPortManager.unmountSlot('fetch-token');
      channelPortManager.unmountSlot('locale');
      channelPortManager.unmountSlot('theme');
    };
  }, [channelPortManager, fetchToken, iframeElement, localeCode, themeConfig]);

  useEffect(() => {
    if (!channelPortManager) return;
    channelPortManager.connect();
    return () => void channelPortManager.disconnect();
  }, [channelPortManager]);

  return (
    <iframe
      key={pathname.split('/')[1]}
      ref={setIframeElement}
      src={iframeUrl}
      style={{ border: 'none', width: '100%', height: '100%' }}
    ></iframe>
  );
};

type FetchTokenHandler = () => Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
}>;
