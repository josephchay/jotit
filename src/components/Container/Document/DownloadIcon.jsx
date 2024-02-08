import { FaRegFileAlt, FaRegFilePdf, FaRegFileWord } from "react-icons/fa";

export const DownloadIcon = ({ type, color = null }) => {
  color |= '#25272DFF';
  let icon;

  if (type === "pdf") {
    icon = <FaRegFilePdf
      size={ ".9em" }
      color={ color }
    />;
  } else if (type === "word") {
    icon = <FaRegFileWord
      size={ ".9em" }
      color={ color }
    />;
  } else {
    icon = <FaRegFileAlt
      size={ ".9em" }
      color={ color }
    />;
  }

  return (
    <span className="bg-gray-300/40 rounded-full p-3 cursor-pointer">
      { icon }
    </span>
  );
};
