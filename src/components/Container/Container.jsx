import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";

export const Container = () => {
  const cards = [
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus",
      status: "downloaded",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus",
      status: "downloading",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus",
      status: "completed",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus",
      status: "downloaded",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus",
      status: "downloading",
    },
    {
      tag: "Ipsum Dolor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus",
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
