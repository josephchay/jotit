import { AnimatePresence, motion } from "framer-motion";

import { DownloadStatus } from "../../../../enums/DownloadStatus.js";

export const DownloadToast = ({ status }) => {
  return (
    <AnimatePresence>
      {
        (status === DownloadStatus.COMPLETED || status === DownloadStatus.DOWNLOADING) && (
          <motion.div
            key={ `status-${status}` }
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
              backgroundColor: status === DownloadStatus.COMPLETED ? 'rgba(74 222 128 1)' : 'rgba(96 165 250 1)',
            }}
            transition={{
              duration: .4,
              type: 'spring',
            }}
            exit={{
              y: 100,
            }}
            className="absolute bottom-0 left-0 w-full py-[19px] flex items-center justify-center text-neutral-50"
          >
            <h2>
              { status.charAt(0).toUpperCase() + status.slice(1) }
            </h2>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}
