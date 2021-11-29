import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { CoordonneeRecord, EtapeRecord } from '~/generated/sdk';

type CarteRatio = {
  W: number;
  H: number;
};

const Etape = ({ etape, carteRatio }: { etape: EtapeRecord; carteRatio?: CarteRatio }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [top, setTop] = useState<number | undefined>(undefined);
  const [left, setLeft] = useState<number | undefined>(undefined);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (carteRatio && etape.marqueur) {
      const { coordX, coordY } = (etape.coordonnees as CoordonneeRecord[])[0];
      setTop(carteRatio.H * coordY - etape.marqueur?.height / 2);
      setLeft(carteRatio.W * coordX - etape.marqueur?.width / 2);
    }
  }, [
    carteRatio,
    etape.coordonnees,
    etape.marqueur,
    etape.marqueur?.height,
    etape.marqueur?.width,
  ]);

  if (!etape.marqueur) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top,
          left,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Image
          src={etape.marqueur.url}
          alt="marqueur"
          width={etape.marqueur.width}
          height={etape.marqueur.height}
        />
        {(isHovered || isMobile) && (
          <motion.div
            className="text-lg text-black bg-white p-3 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {etape.nom}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Etape;
