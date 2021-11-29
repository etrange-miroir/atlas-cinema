import React, { useEffect, useRef } from 'react';

import { useLocomotiveScroll } from 'react-locomotive-scroll';

import { CarteRecord, EtapeRecord } from '~/generated/sdk';

import Etape from '../Etape';

const Carte = ({ carte, etapes }: { carte: CarteRecord; etapes: EtapeRecord[] }) => {
  const { scroll } = useLocomotiveScroll();
  const carteRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (scroll && carteRef.current) {
      const carteWidth = carteRef.current.getBoundingClientRect().width;
      scroll.scrollTo(carteWidth / 2 - window.innerWidth / 2, { duration: 0, disableLerp: true });
    }
  }, [scroll]);

  if (!carte.image) return null;
  return (
    <div className="relative min-h-screen" data-scroll-section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={carte.image?.url}
        alt="fond de carte"
        className="min-h-screen max-w-none"
        ref={carteRef}
      />
      {etapes.map((etape, index) => {
        return (
          <Etape
            key={index}
            etape={etape}
            carteRatio={{
              W: (carteRef.current?.getBoundingClientRect().width ?? 0) / carte.image?.width,
              H: (carteRef.current?.getBoundingClientRect().height ?? 0) / carte.image?.height,
            }}
          />
        );
      })}
    </div>
  );
};

export default Carte;
