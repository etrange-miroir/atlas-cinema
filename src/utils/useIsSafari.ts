import { useEffect, useState } from 'react';

export const useIsSafari = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(navigator.vendor.startsWith('Apple'));
  }, []);

  return isSafari;
};
