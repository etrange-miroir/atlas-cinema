import React from 'react';

import chroma from 'chroma-js';
import { AnimatePresence, motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import SimpleBar from 'simplebar-react';

import { EtapeRecord } from '~/generated/sdk';
import { useDateRangeCopy } from '~/utils/useDateRangeCopy';

import 'simplebar/dist/simplebar.min.css';

import Carousel from '../Carousel';

const EtapeDetail = ({
  etape,
  onDismiss,
  color = 'black',
}: {
  etape?: EtapeRecord;
  onDismiss: () => void;
  color?: string;
}) => {
  const dateRangeCopy = useDateRangeCopy(etape);
  return (
    <AnimatePresence>
      {etape && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 inset-6 bottom-12 md:inset-12 px-6 md:px-8 pb-8 pt-12 md:pt-8 flex flex-col items-center"
          style={{
            backgroundColor: color,
            boxShadow: `4px 2px 4px ${chroma(color).alpha(0.5).hex()}`,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-4xl font-plex font-bold absolute top-2 right-4"
            onClick={onDismiss}
          >
            X
          </motion.button>
          <h2 className="text-3xl md:text-5xl font-ouroboros mb-4 trunctate">
            {etape.nom.toUpperCase()}
          </h2>
          <span className="text-xl md:text-3xl font-plex mb-6 md:mb-16">
            {etape.lieu} ~ {dateRangeCopy}
          </span>
          <SimpleBar className="w-full overflow-x-hidden flex">
            <div className="flex flex-col md:flex-row md:justify-center flex-1">
              <div className="md:flex-1 max-w-screen-md mb-4 md:mb-0">
                {etape.video && (
                  <div className="relative" style={{ paddingTop: '56.25%' }}>
                    <ReactPlayer
                      url={etape.video.url}
                      controls
                      width="100%"
                      height="100%"
                      className="absolute inset-0 w-full h-full"
                      // light={etape.video.thumbnailUrl}
                    />
                  </div>
                )}
                {etape.images.length > 0 && (
                  <div className="mt-4">
                    <Carousel
                      images={etape.images.map((i) => i.responsiveImage)}
                      arrowColor={color}
                    />
                  </div>
                )}
              </div>
              <div className="md:flex-1 md:ml-12 md:max-w-prose">
                {etape.sousTitre && (
                  <h3 className="text-xl md:text-3xl font-plex font-bold mb-4">
                    {etape.sousTitre}
                  </h3>
                )}
                <p
                  className="text-xl font-plex mb-12 paragraph-desc"
                  dangerouslySetInnerHTML={{ __html: etape.description }}
                />
                {etape.liens.length > 0 && (
                  <ul>
                    {etape.liens.map((lien, i) => {
                      return (
                        <li key={i} className="font-plex mb-2 mix-blend-difference text-white">
                          <a href={lien.url} target="_blank" rel="noopener noreferrer">
                            {lien.titre.length ? lien.titre : lien.url}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </SimpleBar>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EtapeDetail;
