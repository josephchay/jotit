import { FaRegFileAlt, FaRegFilePdf, FaRegFileWord } from "react-icons/fa";

export const DownloadIcon = ( props ) => {
  const color = props.color || "#000";
  let icon;

  if (props.type === "pdf") {
    icon = <FaRegFilePdf
      color={ color }
    />;
  } else if (props.type === "word") {
    icon = <FaRegFileWord
      color={ color }
    />;
  } else {
    icon = <FaRegFileAlt
      color={ color }
    />;
  }

  return (
    <span className="bg-secondary-200/40 rounded-full p-3 cursor-pointer">
      { icon }
    </span>
  );
};
