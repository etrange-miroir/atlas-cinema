import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { CoordonneeRecord, EtapeRecord } from '~/generated/sdk';
import { useDateRangeCopy } from '~/utils/useDateRangeCopy';
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

const MARKER_SIZE = 80;

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
  const dateRangeCopy = useDateRangeCopy(etape);
  const isMobile = useIsMobile();
  const [top, setTop] = useState<number | undefined>(undefined);
  const [left, setLeft] = useState<number | undefined>(undefined);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    const { coordX, coordY } = (etape.coordonnees as CoordonneeRecord[])[0];
    setTop(carteRatio.ratioY * coordY - MARKER_SIZE / 2);
    setLeft(carteRatio.ratioX * coordX - MARKER_SIZE / 2);
  }, [carteRatio, etape.coordonnees]);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute cursor-pointer z-20"
        style={{
          top,
          left,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onClick}
      >
        {etape.off ? (
          <MarqueurOff color={color} size={MARKER_SIZE} />
        ) : (
          <MarqueurEtape color={color} size={MARKER_SIZE} />
        )}
        <div
          className="relative -translate-x-1/2 md:max-w-md mt-1 text-center"
          style={{ marginLeft: MARKER_SIZE / 2 }}
        >
          <span
            className="text-2xl md:text-5xl font-ouroboros text-center"
            style={{
              color,
              lineHeight: isMobile ? 'unset' : '3.5rem',
            }}
          >
            {etape.nom}
          </span>
        </div>
        {(isHovered || isMobile) && (
          <motion.div
            className="mt-1 -translate-x-1/2 text-center w-52"
            style={{ marginLeft: MARKER_SIZE / 2 }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="font-ouroboros text-lg md:text-3xl"
              style={{ color }}
            >
              {etape.sousTitre}
            </motion.div>
            <motion.div
              variants={item}
              className="font-ouroboros text-lg md:text-3xl"
              style={{ color }}
            >
              {dateRangeCopy}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Etape;
