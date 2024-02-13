import { Card } from "../Document/Card.jsx";
import { useEffect, useRef, useState } from "react";

import { NOTE_HEIGHT, NOTE_WIDTH } from "../../../constants/locals.js";
import { id } from "../../../utils/math.js";

export const CardGroup = () => {
  const ref = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("JotItProject")) || []);

  const addItem = (e) => {
    const newItems = [...items];

    const x = e.clientX - NOTE_WIDTH / 2;
    const y = e.clientY - NOTE_HEIGHT / 2;

    newItems.push({
      id: id(),
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
  }

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
  }, [items]);

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
          />
        ))
      }
    </div>
  )
}
