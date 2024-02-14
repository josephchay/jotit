import { Card } from "../Document/Card.jsx";
import { useEffect, useRef, useState } from "react";

import { NOTE_HEIGHT, NOTE_WIDTH } from "../../../constants/locals.js";
import { id } from "../../../utils/math.js";

export const CardGroup = (
  { setAction }
) => {
  const ref = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("JotItProject")) || []);
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
    localStorage.setItem("JotItProject", JSON.stringify(items));

    // Check if all cards have completed animation
    if (Object.values(animationCompleted).every((status) => status)) {
      setAction("idle");
    }
  }, [animationCompleted, items, setAction]);

  return (
    <div
      ref={ ref }
      className="fixed z-[3] w-full h-full"
      onDoubleClick={ addItem }
    >
      {
        items.map((item, index) => (
          <Card
            key={ index }
            index={ index }
            groupRef={ ref }
            id={ item.id }
            pos={ item.pos }
            content={ item.content }
            isInitialLoad={ isInitialLoad }
            updateItemTag={ updateItemTag }
            updateItemDescription={ updateItemDescription }
            onAnimationComplete={() => handleAnimationComplete(item.id)}
          />
        ))
      }
    </div>
  )
}
