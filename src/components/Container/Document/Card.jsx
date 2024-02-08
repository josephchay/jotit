import { motion } from "framer-motion";

import { DownloadIcon } from "./DownloadIcon.jsx";

export const Card = ({
  groupRef,
  tag,
  description,
  status,
}) => {
  return (
    <motion.div
      drag
      dragConstraints={ groupRef }
      className="relative w-60 h-80 flex-shrink-0 rounded-[30px] px-4 py-10 bg-gray-200/50 backdrop-blur-md overflow-hidden"
    >
      <h3
        className="mb-4 text-xs font-bold tracking-wider text-secondary-900 selection:bg-gray-300/50 selection:text-secondary-900"
      >
        { tag }
      </h3>
      <p
        className="text-md text-secondary-700 selection:bg-gray-300/50 selection:text-secondary-900"
      >
        { description }
      </p>
      <div
        className="absolute bottom-0 left-0 w-full px-8 py-3 bg-gray-300/30"
      >
        <div
          className="flex items-center justify-between"
        >
          <DownloadIcon type="pdf" />
          <DownloadIcon type="word" />
          <DownloadIcon />
        </div>
      </div>
      {
        status === 'downloaded' && (
          <div
            className="absolute bottom-0 left-0 w-full py-[19px] flex items-center justify-center bg-green-400 text-neutral-50
            selection:bg-green-500/50 selection:text-white"
          >
            <h2>
              Completed
            </h2>
          </div>
        )
      }
      {
        status === 'downloading' && (
          <div
            className="absolute bottom-0 left-0 w-full py-[19px] flex items-center justify-center bg-blue-400 text-neutral-50
            selection:bg-green-500/50 selection:text-white"
          >
            <h2>
              Downloading
            </h2>
          </div>
        )
      }
    </motion.div>
  )
}
