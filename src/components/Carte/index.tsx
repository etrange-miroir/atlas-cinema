import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';
import BounceLoader from 'react-spinners/BounceLoader';

import { CarteRecord, EtapeRecord } from '~/generated/sdk';
import { useGradient } from '~/utils/useGradient';
import { useHorizontalScroll } from '~/utils/useHorizontalScroll';
import { useIsMobile } from '~/utils/useIsMobile';

import Etape from '../Etape';
import EtapeDetail from '../EtapeDetail';
import Year from '../Year';

export type CarteRatio = { ratioX: number; ratioY: number };

const START_YEAR = 2019;
const END_YEAR = 2028;
const DELTA_YEARS = END_YEAR - START_YEAR + 1;
const MIN_LOADER_TIME = 2000;

const getcolor = (pct: number, gradient: string[]) => {
  return chroma.scale(gradient)(pct).brighten(2).hex();
};

const Carte = ({ carte, etapes }: { carte: CarteRecord; etapes: EtapeRecord[] }) => {
  const isMobile = useIsMobile();
  const [carteLoaded, setCarteLoaded] = useState(false);
  const [grilleLoaded, setGrilleLoaded] = useState(false);
  const [carteDisplayH, setCarteDisplayH] = useState(0);
  const [carteDisplayW, setCarteDisplayW] = useState(0);
  const scrollRef = useHorizontalScroll();
  const [ratio, setRatio] = useState<CarteRatio>();
  const [scrollPct, setScrollPct] = useState((new Date().getFullYear() - START_YEAR) / DELTA_YEARS);
  const [scrollColor, setScrollColor] = useState<string>();
  const [scrollYear, setScrollYear] = useState(
    `${START_YEAR + Math.floor(scrollPct * DELTA_YEARS)}`
  );
  const [selectedEtape, setSelectedEtape] = useState<EtapeRecord>();
  const gradient = useGradient(carte);

  useEffect(() => {
    const handleResize = () => {
      const factor = window.innerHeight / carte.fond.height;
      setCarteDisplayH(window.innerHeight);
      setCarteDisplayW(carte.fond.width * factor);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [carte]);

  const handleCarteLoaded = useCallback(() => {
    // give at least 1s of loader to avoid unpleasant blink
    setTimeout(() => {
      setCarteLoaded(true);
    }, MIN_LOADER_TIME);
  }, []);

  const handleGrilleLoaded = useCallback(() => {
    // give at least 1s of loader to avoid unpleasant blink
    setTimeout(() => {
      setGrilleLoaded(true);
    }, MIN_LOADER_TIME);
  }, []);

  // scroll to the center of the carte.fond on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: carteDisplayW * scrollPct - window.innerWidth / 2 + 1,
      });
    }
    // the missing dep is intended
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carteDisplayW, scrollRef]);

  // keep track of scroll pct
  useEffect(() => {
    if (scrollRef.current) {
      const scrollDiv = scrollRef.current;
      const handleScroll = (e: Event) => {
        const target = e.target as HTMLDivElement;
        const pct = (target.scrollLeft + target.clientWidth / 2) / carteDisplayW;
        setScrollPct(pct);
      };
      scrollDiv.addEventListener('scroll', handleScroll);
      return () => {
        scrollDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [carteDisplayW, gradient, scrollRef]);

  // use scroll pct to change color of the barre
  useEffect(() => {
    setScrollColor(getcolor(scrollPct, gradient));
  }, [gradient, scrollPct]);

  // use scroll pct to change year
  useEffect(() => {
    const computedYear = START_YEAR + Math.floor(scrollPct * DELTA_YEARS);
    switch (computedYear) {
      case START_YEAR:
        setScrollYear(`${computedYear} -`);
        break;
      case END_YEAR:
        setScrollYear(`${computedYear} +`);
        break;
      default:
        setScrollYear(`&nbsp;&nbsp;${computedYear}&nbsp;&nbsp;`);
        break;
    }
  }, [scrollPct]);

  // once the carte.fond is rendered, compute the display ratio
  // that will then serve to place etape at the right spot
  useEffect(() => {
    if (carte.fond) {
      setRatio({
        ratioX: carteDisplayW / carte.fond.width,
        ratioY: carteDisplayH / carte.fond.height,
      });
    }
  }, [carte.fond, carteDisplayH, carteDisplayW]);

  // only render etapes once ratio, gradient and carte.fond are here
  const renderEtapes = useCallback(() => {
    if (ratio && gradient && carte.fond) {
      return etapes.map((etape, index) => {
        const color = getcolor(etape.coordonnees[0].coordX / carte.fond.width, gradient);
        return (
          <Etape
            key={index}
            etape={etape}
            carteRatio={ratio}
            color={color}
            onClick={() => setSelectedEtape(etape)}
          />
        );
      });
    }
  }, [carte.fond, etapes, gradient, ratio]);

  if (!carte.fond) return null;
  return (
    <>
      <div
        className="relative h-screen overflow-x-auto md:overflow-x-hidden overflow-y-hidden"
        ref={scrollRef}
      >
        <AnimatePresence>
          {!carteLoaded && !grilleLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black flex justify-center items-center"
            >
              <BounceLoader color="white" size={isMobile ? 180 : 240} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="fixed z-10 left-1/2 transform -translate-x-1/2 flex flex-row top-20">
          <Year year={scrollYear} color={scrollColor} />
        </div>
        <svg
          viewBox="0 0 5 1080"
          className="fixed h-screen z-10 left-1/2 transform -translate-x-1/2"
        >
          <line
            x1="2.5"
            y1={isMobile ? 180 : 200}
            x2="2.5"
            y2="1077.5"
            stroke={scrollColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="20 30"
          />
        </svg>
        <div className="relative md:absolute">
          <div className="absolute top-0 left-0">
            <Image
              src={carte.fond.url}
              alt="fond de carte"
              quality={100}
              unoptimized
              layout="fixed"
              onLoadingComplete={handleCarteLoaded}
              width={carteDisplayW}
              height={carteDisplayH}
            />
          </div>
          <div className={`absolute top-0 left-0 ${isMobile && 'hidden'}`}>
            <Image
              src={carte.grille.url}
              alt="fond de carte"
              quality={100}
              unoptimized
              layout="fixed"
              onLoadingComplete={handleGrilleLoaded}
              width={carteDisplayW}
              height={carteDisplayH}
            />
          </div>
          {renderEtapes()}
        </div>
      </div>
      <EtapeDetail
        etape={selectedEtape}
        onDismiss={() => setSelectedEtape(undefined)}
        color={scrollColor}
      />
    </>
  );
};

export default Carte;
