import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";

export const Container = () => {
  const cards = [
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "downloaded",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "downloading",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "completed",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "downloaded",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "downloading",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "completed",
    },
  ]

  return (
    <div>
      <Background />
      <CardGroup
        items={ cards }
      />
    </div>
  )
}
