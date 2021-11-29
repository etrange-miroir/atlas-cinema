import React, { useRef } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import 'tailwindcss/tailwind.css';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const containerRef = useRef(null);
  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        getDirection: true,
        getSpeed: true,
        direction: 'horizontal',
        // ... all available Locomotive Scroll instance options
      }}
      watch={
        [
          // all the dependencies you want to watch to update the scroll.
          // Basicaly, you would want to watch page/location changes
          // For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
        ]
      }
      containerRef={containerRef}
    >
      <div data-scroll-container ref={containerRef}>
        <Component {...pageProps} />
      </div>
    </LocomotiveScrollProvider>
  );
}

export default appWithTranslation(MyApp);
