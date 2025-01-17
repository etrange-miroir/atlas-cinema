import React, { useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { EtapeRecord } from '~/generated/sdk';
import { useIsMobile } from '~/utils/useIsMobile';

import { CarteRatio } from '../Carte';
import { MarqueurEtape } from '../MarqueurEtape';
import { MarqueurOff } from '../MarqueurOff';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Etape = ({
  etape,
  carteRatio,
  color,
  onClick,
}: {
  etape: EtapeRecord;
  carteRatio: CarteRatio;
  color: string;
  onClick: () => void;
}) => {
  const isMobile = useIsMobile();
  const [top, setTop] = useState<number | undefined>(undefined);
  const [left, setLeft] = useState<number | undefined>(undefined);
  const [isHovered, setHovered] = useState(false);
  const [markerSize, setMarkerSize] = useState(80);
  const shouldShowTitle = useMemo(() => {
    return !etape.off || isHovered || isMobile;
  }, [etape.off, isHovered, isMobile]);

  const shouldShowSubtitle = useMemo(() => {
    return etape.sousTitre.length && isHovered && !isMobile;
  }, [etape.sousTitre.length, isHovered, isMobile]);

  useEffect(() => {
    setMarkerSize(isMobile ? 40 : 80);
  }, [isMobile]);

  useEffect(() => {
    const { coordX, coordY } = etape.coordonnees[0];
    setTop(carteRatio.ratioY * coordY - markerSize / 2);
    setLeft(carteRatio.ratioX * coordX - markerSize / 2);
  }, [markerSize, carteRatio, etape.coordonnees]);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute cursor-pointer z-20 w-96"
        style={{
          top,
          left,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {etape.off ? (
          <>
            <div className="md:hidden block">
              <MarqueurOff color={color} size={60} hovered={isHovered} />
            </div>
            <div className="md:block hidden">
              <MarqueurOff color={color} size={80} hovered={isHovered} />
            </div>
          </>
        ) : (
          <>
            <div className="md:hidden block">
              <MarqueurEtape color={color} size={60} hovered={isHovered} />
            </div>
            <div className="md:block hidden">
              <MarqueurEtape color={color} size={80} hovered={isHovered} />
            </div>
          </>
        )}
        {shouldShowTitle && (
          <AnimatePresence>
            <motion.div
              className="relative transform -translate-x-1/2 mt-1 text-center"
              style={{ marginLeft: markerSize / 2 }}
              variants={item}
              initial="hidden"
              animate="show"
            >
              <span
                className="text-xl md:text-3xl font-ouroboros text-center"
                style={{
                  color,
                }}
              >
                {etape.nom.toUpperCase()}
              </span>
            </motion.div>
          </AnimatePresence>
        )}
        {shouldShowSubtitle && (
          <motion.div
            className="mt-1 -translate-x-1/2 text-center w-52"
            style={{ marginLeft: markerSize / 2 }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="font-ouroboros text-base md:text-xl"
              style={{ color }}
            >
              {etape.sousTitre}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Etape;
