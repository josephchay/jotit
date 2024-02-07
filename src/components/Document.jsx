import { FaRegFileAlt } from "react-icons/fa";

export const Document = () => {
  return (
    <div
      className="fixed z-[3] w-full h-full"
    >
      <div
        className="relative w-60 h-80 rounded-2xl bg-primary-300/50"
      >
        <FaRegFileAlt />
        <p
          className="text-primary-700 leading-4"
        >
          Document
        </p>
      </div>
    </div>
  )
}
