import { motion } from "framer-motion";
import { FaRegFileAlt, FaRegFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";

export const DownloadIcon = ({
  tag,
  description,
  type = 'txt',
  color = '#25272DFF',
}) => {
  let fileType;
  let fileName = `jotit-${tag}-`;
  let file;

  switch (type) {
    case "pdf":
      break;
    case "word":
      fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      file = new Blob([
        description
      ], {
        type: fileType,
      });
      break;
    case "txt":
      fileType = "text/plain";
      file = new Blob([
        `JotIt\n\n${tag}\n\n${description}`
      ], {
        type: fileType,
      });
      break;
  }

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    doc.text("JotIt", 100, 20);
    doc.text(doc.splitTextToSize(`${tag}\n\n${description}`, 180), 20, 40);
    doc.save(`${fileName}${new Date().toISOString().replace(/:/g, '-')}.pdf`);
  }

  const downloadWord = () => {
    // TODO: Implement downloadWord function
  }

  return (
    <>
      {
        type === 'pdf' && (
          <motion.span
            onPointerDownCapture={ e => e.stopPropagation() }
            onClick={ downloadPdf }
            className="bg-gray-300/40 rounded-full p-3 cursor-pointer"
          >
            <FaRegFilePdf
              size=".9em"
              color={ color }
            />
          </motion.span>
        )
      }
      {
        type === 'word' && (
          <span
            onPointerDownCapture={ e => e.stopPropagation() }
            onClick={ downloadWord }
            className="bg-gray-300/40 rounded-full p-3 cursor-pointer"
          >
            <FaRegFileAlt
              size=".9em"
              color={ color }
            />
          </span>
        )
      }
      {
        type === 'txt' && (
          <a
            download={ `${fileName}${new Date().toISOString().replace(/:/g, '-')}.${type}` }
            target="_blank"
            rel="noreferrer"
            href={ URL.createObjectURL(file) }
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            onPointerDownCapture={ e => e.stopPropagation() }
            className="bg-gray-300/40 rounded-full p-3 cursor-pointer"
          >
            <FaRegFileAlt
              size=".9em"
              color={ color }
            />
          </a>
        )
      }
    </>
  );
};
