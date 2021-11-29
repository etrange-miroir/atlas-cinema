import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/dist/client/router';

import {
  AVAILABLES_LOCALES as RAW_AVAILABLES_LOCALES,
  DEFAULT_LOCALE,
} from '../../next-i18next.config';

// This can't be infered from the JS file
export type AvailableLocale = 'fr' | 'en';
export const AVAILABLE_LOCALES = RAW_AVAILABLES_LOCALES as AvailableLocale[];

export const useChangeLocale = () => {
  const router = useRouter();

  return useCallback(
    (value: AvailableLocale) => {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, {
        locale: value,
      });
    },
    [router]
  );
};

export const useCurrentLocale = (): AvailableLocale => {
  const router = useRouter();

  return useMemo(() => {
    return (router.locale ?? DEFAULT_LOCALE) as AvailableLocale;
  }, [router.locale]);
};
