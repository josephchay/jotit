import { Card } from "../Document/Card.jsx";
import { useRef } from "react";

export const CardGroup = () => {
  const ref = useRef(null);

  const items = [
    {
      pos: {
        x: 0,
        y: 0,
      },
      content: {
        tag: "Ipsum Dolor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    },
    {
      pos: {
        x: 130,
        y: 200,
      },
      content: {
        tag: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    },
    {
      pos: {
        x: 700,
        y: 400,
      },
      content: {
        tag: "Dolor Sit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    },
    {
      pos: {
        x: 240,
        y: 500,
      },
      content: {
        tag: "Amet Consectetur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    },
    {
      pos: {
        x: 400,
        y: 300,
      },
      content: {
        tag: "Adipiscing Elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    },
    {
      pos: {
        x: 800,
        y: 100,
      },
      content: {
        tag: "Nulla Nec Dui",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      }
    },
  ];

  return (
    <div
      ref={ ref }
      className="fixed z-[3] w-full h-full"
    >
      {
        items.map((item, index) => (
          <Card
            key={ index }
            index={ index }
            groupRef={ ref }
            pos={ item.pos }
            content={ item.content }
          />
        ))
      }
    </div>
  )
}
