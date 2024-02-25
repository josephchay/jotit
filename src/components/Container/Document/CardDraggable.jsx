import { forwardRef } from "react";
import { motion } from "framer-motion";

import { Actions } from "../../../enums/Actions.js";

const isThrashing = (enabled, rect) => {
  if (enabled) {
    const thresholdX = 280;
    const thresholdY = 300;

    const screenHorizontalCenter = window.innerWidth / 2;

    const minX = screenHorizontalCenter - 20 - thresholdX;
    const maxX = screenHorizontalCenter + 20 + thresholdX;
    const minY = 0 - thresholdY;
    const maxY = 100 + thresholdY;

    if (
      rect.left > minX &&
      rect.right < maxX &&
      rect.top > minY &&
      rect.bottom < maxY
    ) {
      return true;
    }
  }

  return false;
};

const CardDraggable = forwardRef(({
  id,
  children,
  pos,
  constraints,
  action,
  onClick,
  onMouseDown,
  onMouseUp,
  onTrash,
  onTrashable,
}, ref) => {
  const node = document.getElementById(`cardDraggable-${id}`);

  const handleDrag = (event, info) => {
    if (action === Actions.THRASHING) {
      let rect = getRect();

      if (isThrashing(true, rect)) {
        onTrashable(1.2);
      } else {
        onTrashable(1);
      }
    }
  }

  const handleDragEnd = (event, info) => {
    if (action === Actions.THRASHING) {
      handleTrash();
    }
  }

  const getRect = () => {
    let rect = node.getBoundingClientRect();

    const left = (rect.left - window.scrollX);
    const right = left + node.offsetWidth;
    const top = (rect.top - window.scrollY);
    const bottom = top + node.offsetHeight;

    return { left, right, top, bottom };
  }

  const handleTrash = () => {
    requestAnimationFrame(() => {

      let rect = getRect();

      if (isThrashing(true, rect)) {
        onTrash(id);
      }
    });
  }

  return (
    <motion.div
      ref={ ref }
      id={ `cardDraggable-${id}` }
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
      onDrag={ handleDrag }
      onDragEnd={ handleDragEnd }
    >
      { children }
    </motion.div>
  )
});

CardDraggable.displayName = "CardDraggable";

export { CardDraggable };
