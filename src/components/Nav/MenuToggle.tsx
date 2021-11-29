import React from 'react';

import { motion, SVGMotionProps } from 'framer-motion';

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path fill="transparent" strokeWidth="2" strokeLinecap="square" {...props} />
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    title="menu"
    onClick={toggle}
    className="fixed z-10 top-6 md:top-12 right-6 md:right-12 border-none outline-none focus:outline-none bg-transparent"
  >
    <svg width="46" height="46" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5', stroke: 'white', transition: { delay: 0.8 } },
          open: { d: 'M 3 16.5 L 17 2.5', stroke: 'black', transition: { delay: 0.3 } },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1, stroke: 'white', transition: { duration: 0.1, delay: 0.8 } },
          open: { opacity: 0, stroke: 'black', transition: { duration: 0.1, delay: 0.3 } },
        }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346', stroke: 'white', transition: { delay: 0.8 } },
          open: { d: 'M 3 2.5 L 17 16.346', stroke: 'black', transition: { delay: 0.3 } },
        }}
      />
    </svg>
  </button>
);

export default MenuToggle;
