import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

const Year = ({ year, color = 'black' }: { year: string; color?: string }) => {
  return (
    <AnimatePresence>
      <motion.p
        key={year}
        exit={{ y: 75, opacity: 0, position: 'absolute' }}
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          duration: 0.3,
        }}
        style={{ color }}
      >
        {year}
      </motion.p>
    </AnimatePresence>
  );
};

export default Year;
