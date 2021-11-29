import * as React from 'react';
import NextLink from 'next/link';

import { motion } from 'framer-motion';

import { Link } from './index';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: -50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const MenuItem: React.FC<{ link: Link }> = ({ link: { text, href } }) => {
  return (
    <motion.li
      className="text-xl md:text-2xl font-bold cursor-pointer"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <NextLink href={href}>{text}</NextLink>
    </motion.li>
  );
};

export default MenuItem;
