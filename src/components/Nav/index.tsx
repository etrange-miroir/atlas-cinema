import React, { useEffect } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { motion, useCycle } from 'framer-motion';

import MenuItem from './MenuItem';
import MenuToggle from './MenuToggle';

export type Link = { text: string; href: string };

const links: Link[] = [
  {
    text: 'Menu 1',
    href: '/link1',
  },
  {
    text: 'Menu 2',
    href: '/link2',
  },
  {
    text: 'Menu 3',
    href: '/link3',
  },
  {
    text: 'Menu 4',
    href: '/link4',
  },
];

const sidebar = {
  open: {
    translateX: 0,
  },
  closed: {
    translateX: '100vw',
    transition: {
      delay: 0.5,
    },
  },
};

const menu = {
  open: {
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Nav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    if (isOpen) disableBodyScroll(document.body);
    else enableBodyScroll(document.body);
  }, [isOpen]);

  return (
    <motion.div initial="closed" animate={isOpen ? 'open' : 'closed'}>
      <motion.div
        className="fixed z-10 inset-0 flex justify-center items-center bg-white"
        variants={sidebar}
      >
        <motion.ul className="h-1/3 flex flex-col justify-between items-center" variants={menu}>
          {links.map((link, i) => (
            <MenuItem link={link} key={i} />
          ))}
        </motion.ul>
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.div>
  );
};

export default Nav;
