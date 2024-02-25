import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { LOCAL_STORAGE_KEY, NOTE_HEIGHT, NOTE_WIDTH } from "../../../constants/locals.js";
import { id } from "../../../utils/math.js";
import { Actions } from "../../../enums/Actions.js";
import { Card } from "../Document/Card.jsx";

export const CardGroup = ({
  action,
  setAction,
  setTrashIconScale,
}) => {
  const ref = useRef(null);
  const cardRefs = useRef({});

  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  const [animationCompleted, setAnimationCompleted] = useState(() => {
    const initialAnimationCompleted = {};
    items.forEach((item) => {
      initialAnimationCompleted[item.id] = false;
    });
    return initialAnimationCompleted;
  });

  const addItem = (e) => {
    const newItems = [...items];

    const maxX = window.innerWidth - NOTE_WIDTH;
    const maxY = window.innerHeight - NOTE_HEIGHT;
    const x = Math.max(0, Math.min(e.clientX - NOTE_WIDTH / 2, maxX));
    const y = Math.max(0, Math.min(e.clientY - NOTE_HEIGHT / 2, maxY));

    const uniqueId = id();

    newItems.push({
      id: uniqueId,
      pos: {
        x,
        y,
      },
      content: {
        tag: "",
        description: "",
      }
    });

    setItems(newItems);

    // Set the animation completion status for the new item to false
    setAnimationCompleted((prev) => ({
      ...prev,
      [uniqueId]: false,
    }));
  }

  const delItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  const handleDoubleClick = (e) => {
    setAction(Actions.EJECTING);
    addItem(e);
  }

  const handleAnimationComplete = (id) => {
    setAnimationCompleted((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const updateItemTag = (tag, id) => {
    const newItems = items.map((item) =>
      item.id === id
        ? {
          ...item,
          content: {
            ...item.content,
            tag: tag,
          },
        }
        : item
    );
    setItems(newItems);
  };

  const updateItemDescription = (description, id) => {
    const newItems = items.map((item) =>
      item.id === id
        ? {
          ...item,
          content: {
            ...item.content,
            description: description,
          },
        }
        : item
    );
    setItems(newItems);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));

    // Check if all cards have completed animation
    if (Object.values(animationCompleted).every((status) => status)) {
      setAction(Actions.IDLE);
    }
  }, [animationCompleted, items, setAction]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const updatedItems = items.map((item) => {
        const cardRef = cardRefs.current[item.id];

        const rect = cardRef.getBoundingClientRect();

        const currEleX = rect.left - window.scrollX;
        const currEleY = rect.top - window.scrollY;

        /* Everything is working but right after updating the position, the transform translate X and Y
        * is still in the styles which causes a slight element position leap before ending.
        * TODO: fix this && also consider assigning modifiable styles to the CardDraggable for the transform property */
        // draggableDivStyles.transform = 'none'

        return {
          ...item,
          pos: {
            x: currEleX,
            y: currEleY,
          }
        };
      });

      setItems(updatedItems);
    };

    /* Appears that more than or equal to 5 items begins to prevent failure of complete
    * update for all items' positions due to the asynchronous nature of unload event.
    * TODO: Ensure all items' positions update before app closure regardless of amounts of items. */
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [items]);

  return (
    <div
      ref={ ref }
      className="fixed z-[3] w-full h-full"
      onDoubleClick={ handleDoubleClick }
    >
      <AnimatePresence>
        {
          items.map((item, index) => (
            <motion.div
              key={ item.id }
              exit={{
                scale: [1, 1.3, 0],
              }}
              transition={{
                duration: 0.25,
                ease: "easeIn",
              }}
              style={{
                position: "relative",  // for the z-index to work
              }}
            >
              <Card
                key={ index }
                index={ index }
                groupRef={ ref }
                id={ item.id }
                pos={ item.pos }
                content={ item.content }
                updateTag={ updateItemTag }
                updateDescription={ updateItemDescription }
                onAnimationComplete={() => handleAnimationComplete(item.id)}
                action={ action }
                updateAction={ setAction }
                onTrash={ delItem }
                onTrashable={ setTrashIconScale }
                ref={ (ref) => cardRefs.current[item.id] = ref }
              />
            </motion.div>
          ))
        }
      </AnimatePresence>
    </div>
  )
}
