import { useEffect, useState } from "react";

import { Background } from "./Background.jsx";
import { CardGroup } from "./DocumentGroup/CardGroup.jsx";
import { Actions } from "../../enums/Actions.js";
import { LOCAL_STORAGE_KEY } from "../../constants/locals.js";
import { FaFolder, FaFolderOpen, FaTrashAlt } from "react-icons/fa";

export const Container = () => {
  const [action, setAction] = useState(Actions.FRESH);
  const [trashIconScale, setTrashIconScale] = useState(1);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) && JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).length > 0) {
      setAction(Actions.EJECTING);
    }
  }, []);

  const icons = {
    'folder': <FaFolder
      key="folder"
      size={ 24 }
    />,
    'folder-open': <FaFolderOpen
      key="folder-open"
      size={ 24 }
    />,
    'trash': <FaTrashAlt
      key="trash"
      size={ 24 }
      style={{
        transform: `scale(${ trashIconScale })`,
        transition: "transform .2s",
      }}
    />,
  };

  return (
    <div>
      <Background
        action={ action }
        icons={ icons }
      />
      <CardGroup
        action={ action }
        setAction={ setAction }
        setTrashIconScale={ setTrashIconScale }
      />
    </div>
  )
}
