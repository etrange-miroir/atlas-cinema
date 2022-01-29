import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import chroma from 'chroma-js';

import { CarteRecord, EtapeRecord } from '~/generated/sdk';
import { useHorizontalScroll } from '~/utils/useHorizontalScroll';

import Etape from '../Etape';

export type CarteRatio = { ratioX: number; ratioY: number };

const Carte = ({ carte, etapes }: { carte: CarteRecord; etapes: EtapeRecord[] }) => {
  const carteRef = useRef<HTMLImageElement>(null);
  const scrollRef = useHorizontalScroll();
  const [ratio, setRatio] = useState<CarteRatio | undefined>();
  const [barreColor, setBarreColor] = useState<string | undefined>();
  // convenient memo to keep the gradient array computed
  const gradient = useMemo(() => {
    if (
      carte.gradient0 &&
      carte.gradient25 &&
      carte.gradient50 &&
      carte.gradient75 &&
      carte.gradient100
    ) {
      return [
        carte.gradient0.hex!,
        carte.gradient25.hex!,
        carte.gradient50.hex!,
        carte.gradient75.hex!,
        carte.gradient100.hex!,
      ];
    }
  }, [carte.gradient0, carte.gradient100, carte.gradient25, carte.gradient50, carte.gradient75]);

  // scroll to the center of the carte.fond on mount
  useEffect(() => {
    if (carteRef.current && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: carteRef.current.getBoundingClientRect().width / 2 - window.innerWidth / 2,
      });
    }
  }, [carteRef, scrollRef]);

  // keep track of scroll to change the color of the barre
  useEffect(() => {
    if (carteRef.current !== null && scrollRef.current) {
      const scrollDiv = scrollRef.current;
      const carteWidth = carteRef.current.getBoundingClientRect().width;
      const handleScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        const pct = (target.scrollLeft + target.clientWidth / 2) / carteWidth;
        setBarreColor(chroma.scale(gradient)(pct).hex());
      };
      scrollDiv.addEventListener('scroll', handleScroll);
      return () => {
        scrollDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [carteRef, gradient, scrollRef]);

  // once the carte.fond is rendered, compute the display ratio
  // that will then serve to place etape at the right spot
  useEffect(() => {
    if (carteRef.current && carte.fond) {
      setRatio({
        ratioX: carteRef.current.getBoundingClientRect().width / carte.fond.width,
        ratioY: carteRef.current.getBoundingClientRect().height / carte.fond.height,
      });
    }
  }, [carte.fond, carteRef]);

  // only render etapes once ratio, gradient and carte.fond are here
  const renderEtapes = useCallback(() => {
    if (ratio && gradient && carte.fond) {
      return etapes.map((etape, index) => {
        const color = chroma
          .scale(gradient)(etape.coordonnees[0].coordX / carte.fond!.width)
          .hex();
        return <Etape key={index} etape={etape} carteRatio={ratio} color={color} />;
      });
    }
  }, [carte.fond, etapes, gradient, ratio]);

  if (!carte.fond) return null;
  return (
    <div
      className="relative h-screen overflow-x-auto md:overflow-x-hidden overflow-y-hidden"
      ref={scrollRef}
    >
      <svg viewBox="0 0 5 1080" className="fixed h-screen z-10 left-1/2 transform -translate-x-1/2">
        <line
          x1="2.5"
          y1="160.5"
          x2="2.5"
          y2="1077.5"
          stroke={barreColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="20 30"
        />
      </svg>
      <div className="relative md:absolute">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={carte.fond?.url}
          alt="fond de carte"
          className="h-screen max-w-none"
          ref={carteRef}
        />
        {renderEtapes()}
      </div>
    </div>
  );
};

export default Carte;
