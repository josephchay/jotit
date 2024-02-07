import { FaRegFileAlt, FaRegFilePdf, FaRegFileWord } from "react-icons/fa";

export const Document = () => {
  return (
    <div
      className="fixed z-[3] w-full h-full"
    >
      <div
        className="relative w-60 h-80 rounded-[30px] px-4 py-10 bg-secondary-300/50 overflow-hidden"
      >
        <p
          className="text-md text-secondary-700"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus
        </p>
        <div
          className="absolute bottom-0 left-0 w-full px-8 py-4 bg-primary-500/70"
        >
          <div
            className="flex items-center justify-between"
          >
            <span
              className="bg-secondary-300/30 rounded-full p-3"
            >
              <FaRegFileAlt
                color="#000"
              />
            </span>
            <span
              className="bg-secondary-300/30 rounded-full p-3"
            >
              <FaRegFilePdf
                color="#000"
              />
            </span>
            <span
              className="bg-secondary-300/30 rounded-full p-3"
            >
              <FaRegFileWord
                color="#000"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
