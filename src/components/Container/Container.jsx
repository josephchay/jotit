import { useEffect, useState } from "react";

import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";
import { Actions } from "../../enums/Actions.js";

export const Container = () => {
  const [action, setAction] = useState(Actions.FRESH);

  useEffect(() => {
    if (localStorage.getItem("JotItProject") && JSON.parse(localStorage.getItem("JotItProject")).length > 0) {
      setAction(Actions.EJECTING);
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
