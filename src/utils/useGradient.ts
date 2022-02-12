import { useMemo } from 'react';

import { CarteRecord } from '~/generated/sdk';

export const useGradient = (carte: CarteRecord) => {
  const gradient = useMemo(() => {
    return [
      carte.gradient0.hex,
      carte.gradient25.hex,
      carte.gradient50.hex,
      carte.gradient75.hex,
      carte.gradient100.hex,
    ];
  }, [carte.gradient0, carte.gradient100, carte.gradient25, carte.gradient50, carte.gradient75]);
  return gradient;
};
