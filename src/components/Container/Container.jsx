import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";
import { useEffect, useState } from "react";

export const Container = () => {
  const [action, setAction] = useState('fresh');

  useEffect(() => {
    setAction('ejecting');
  }, []);

  return (
    <div>
      <Background
        action={ action }
      />
      <CardGroup
        action={ action }
        setAction={ setAction }
      />
    </div>
  )
}
