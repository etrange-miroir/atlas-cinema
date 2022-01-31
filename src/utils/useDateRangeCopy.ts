import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import enLocale from 'date-fns/locale/en-US';
import frLocale from 'date-fns/locale/fr';

import { EtapeRecord } from '~/generated/sdk';

export const useDateRangeCopy = (etape?: EtapeRecord) => {
  const { i18n } = useTranslation();
  const [dateCopy, setDateCopy] = useState<string>();

  useEffect(() => {
    if (etape) {
      if (etape.dateDeDebut && etape.dateDeFin) {
        const debut = new Date(etape.dateDeDebut);
        const fin = new Date(etape.dateDeFin);
        const sameMonth = isSameMonth(debut, fin);
        const sameYear = isSameYear(debut, fin);
        if (sameMonth && sameYear) {
          const end = format(fin, 'MMMM yyyy', {
            locale: i18n.language === 'fr' ? frLocale : enLocale,
          });
          setDateCopy(end);
        } else if (sameYear) {
          const start = format(debut, 'MMMM', {
            locale: i18n.language === 'fr' ? frLocale : enLocale,
          });
          const end = format(fin, 'MMMM yyyy', {
            locale: i18n.language === 'fr' ? frLocale : enLocale,
          });
          setDateCopy(`${start}-${end}`);
        } else {
          const start = format(debut, 'MMMM yyyy', {
            locale: i18n.language === 'fr' ? frLocale : enLocale,
          });
          const end = format(fin, 'MMMM yyyy', {
            locale: i18n.language === 'fr' ? frLocale : enLocale,
          });
          setDateCopy(`${start}-${end}`);
        }
      } else if (etape.dateDeDebut) {
        setDateCopy(
          format(new Date(etape.dateDeDebut), 'MMMM yyyy', {
            locale: i18n.language === 'fr' ? frLocale : enLocale,
          })
        );
      }
    } else {
      setDateCopy('');
    }
  }, [etape, etape?.dateDeDebut, etape?.dateDeFin, i18n.language]);

  return dateCopy;
};
