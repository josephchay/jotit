import { Card } from "../Document/Card.jsx";
import { useRef } from "react";

export const CardGroup = ({ items }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ ref }
      className="fixed z-[3] w-full h-full flex flex-wrap gap-10 p-6"
    >
      {
        items.map((item, index) => (
          <Card
            key={ index }
            groupRef={ ref }
            { ...item }
          />
        ))
      }
    </div>
  )
}
