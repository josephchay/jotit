import { useEffect, useState } from "react";

import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";
import { Actions } from "../../enums/Actions.js";
import { LOCAL_STORAGE_KEY } from "../../constants/locals.js";

export const Container = () => {
  const [action, setAction] = useState(Actions.FRESH);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) && JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).length > 0) {
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
