import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";
import { useEffect, useState } from "react";

export const Container = () => {
  const [action, setAction] = useState('idle');

  useEffect(() => {
    setAction('ejecting')
  }, []);

  return (
    <div>
      <Background
        action={ action }
        setAction={ setAction }
      />
      <CardGroup
        action={ action }
        setAction={ setAction }
      />
    </div>
  )
}
