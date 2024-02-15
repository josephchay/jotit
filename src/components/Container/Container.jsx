import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";
import { useEffect, useState } from "react";

export const Container = () => {
  const [action, setAction] = useState('fresh');

  useEffect(() => {
    if (localStorage.getItem("JotItProject") && JSON.parse(localStorage.getItem("JotItProject")).length > 0) {
      setAction('ejecting');
    }
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
