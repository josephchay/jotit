import { motion } from "framer-motion";

import { Actions } from "../../../enums/Actions.js";

export const CardFresh = ({
  children,
  index,
  action,
  onAnimationComplete = () => {},
}) => {
  return (
    <motion.div
      style={{
        position: "relative",
      }}
      initial={{
        scale: 0,
        y: 100,
      }}
      animate={{
        scale: 1,
        y: 0,
      }}
      transition={{
        scale: {
          delay: action === Actions.FRESH ? 1.2 + index * .2 : 0,
          ease: [0.2, 0.05, -0.01, 0.9],
          duration: 1,
        },
        x: {
          delay: action === Actions.FRESH ? 1.4 + index * .2 : .2,
          ease: [0.2, 0.4, -0.01, 1],
          duration: 1.4,
        },
        y: {
          delay: action === Actions.FRESH ? 1.4 + index * .2 : .2,
          ease: [0.2, 0.4, -0.01, 1],
          duration: 1.4,
        },
      }}
      onAnimationComplete={ onAnimationComplete }
    >
      { children }
    </motion.div>
  )
}
