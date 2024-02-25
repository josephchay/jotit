import { motion, AnimatePresence } from "framer-motion";

import { Actions } from "../../enums/Actions.js";

const variants = {
  enter: {
    scale: 0,
    opacity: 0,
  },
  center: {
    scale: 1,
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: {
    scale: 0,
    zIndex: 0,
    opacity: 0,
  },
};

export const Background = ({
  action,
  icons,
}) => {
  const icon = action === Actions.IDLE ? 'folder' : action === Actions.EJECTING ? 'folder-open' : 'trash';

  return (
    <div
      className="fixed z-[2] w-full h-screen"
    >
      <div
        className="flex justify-center absolute tracking-wider text-secondary-700 w-full py-10"
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          <AnimatePresence
            // mode="wait"
            // initial={ false }
          >
            <motion.div
              key={ action }
              variants={ variants }
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                position: 'absolute',
              }}
            >
              { icons[icon] }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[240px] font-bold leading-none tracking-widest text-secondary-800
        selection:bg-transparent selection:text-secondary-800"
      >
        JOTIT
      </h1>
    </div>
  );
};
