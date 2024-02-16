import { motion } from "framer-motion";
import { forwardRef } from "react";

const CardDraggable = forwardRef(
  (
  {
    children,
    pos,
    constraints,
    onClick,
    onMouseDown,
    onMouseUp,
  },
  ref
) => {
  return (
    <motion.div
      ref={ ref }
      dragConstraints={ constraints }
      drag
      dragElastic={ .2 }
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 10,
      }}
      whileDrag={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1.1,
      }}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
      }}
      onDoubleClick={ e => e.stopPropagation() } // prevent adding a new card when double clicking
      onClick={ onClick }
      onMouseDown={ onMouseDown }
      onMouseUp={ onMouseUp }
    >
      { children }
    </motion.div>
  )
});

CardDraggable.displayName = "CardDraggable";

export { CardDraggable };
