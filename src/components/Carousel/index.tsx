import React, { useCallback } from 'react';

import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import { Image, ResponsiveImageType } from 'react-datocms';

import { ResponsiveImage } from '~/generated/sdk';

import 'keen-slider/keen-slider.min.css';

const Carousel: React.FC<{ images: ResponsiveImage[]; arrowColor?: string }> = ({
  images,
  arrowColor = 'white',
}) => {
  const [refCallback, slider] = useKeenSlider({
    loop: true,
    initial: 0,
  });

  const prev = useCallback(
    (e) => {
      e.stopPropagation();
      slider.current?.prev();
    },
    [slider]
  );

  const next = useCallback(
    (e) => {
      e.stopPropagation();
      slider.current?.next();
    },
    [slider]
  );

  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image className="relative" data={images[0] as ResponsiveImageType} />
    );
  }
  return (
    <div ref={refCallback} className="relative keen-slider">
      {images.map((image, i) => {
        return (
          <div className="keen-slider__slide !min-w-full !max-w-full" key={i}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image data={image as ResponsiveImageType} />
          </div>
        );
      })}
      {slider && (
        <div className="flex absolute w-full top-1/2 transform -translate-y-1/2 justify-between px-1 md:text-6xl text-5xl">
          <motion.button
            className="slider-btn flex items-center justify-center ring-transparent outline-none"
            style={{ color: arrowColor }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prev}
          >
            <span role="img" aria-label="image précédente">
              ❮
            </span>
          </motion.button>
          <motion.button
            className="slider-btn flex items-center justify-center ring-transparent outline-none"
            style={{ color: arrowColor }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={next}
          >
            <span role="img" aria-label="image suivante">
              ❯
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
