import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import ReactPlayer from 'react-player';

import { EtapeRecord } from '~/generated/sdk';
import { useDateRangeCopy } from '~/utils/useDateRangeCopy';

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
  console.log(etape);
  return (
    <AnimatePresence>
      {etape && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-6 bottom-12 md:inset-12 z-30 px-6 md:px-8 py-8 flex flex-col items-center"
          style={{ backgroundColor: color }}
        >
          <button
            className="text-4xl font-plex font-bold absolute top-2 right-4"
            onClick={onDismiss}
          >
            X
          </button>
          <h2 className="text-4xl md:text-7xl font-ouroboros mb-4">{etape.nom}</h2>
          <span className="text-xl md:text-3xl font-plex mb-6 md:mb-16">
            {etape.lieu} ~ {dateRangeCopy}
          </span>
          <div className="flex flex-col md:flex-row flex-1 w-full overflow-x-hidden overflow-y-auto">
            <div className="md:flex-1 max-w-screen-md mb-4 md:mb-0">
              {etape.video && (
                <div className="relative" style={{ paddingTop: '56.25%' }}>
                  <ReactPlayer
                    url={etape.video.url!}
                    controls
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}
              {etape.images && (
                <div className="mt-4">
                  <Carousel
                    images={etape.images.map((i) => i.responsiveImage!)}
                    arrowColor={color}
                  />
                </div>
              )}
            </div>
            <div className="md:flex-1 md:ml-12">
              {etape.sousTitre && (
                <h3 className="text-xl md:text-3xl font-plex font-bold mb-4">{etape.sousTitre}</h3>
              )}
              <p
                className="text-xl md:text-3xl font-plex mb-12"
                dangerouslySetInnerHTML={{ __html: etape.description! }}
              />
              <ul>
                {etape.liens.map((lien, i) => {
                  return (
                    <li key={i} className="font-plex mb-2 mix-blend-difference text-white">
                      <a href={lien.url!} target="_blank" rel="noopener noreferrer">
                        {lien.titre?.length ? lien.titre : lien.url}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EtapeDetail;
