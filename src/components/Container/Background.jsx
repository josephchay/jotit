import { motion } from "framer-motion";
import { FaFolderOpen } from "react-icons/fa";

export const Background = (
  { action }
) => {
  return (
    <div
      className="fixed z-[2] w-full h-screen"
    >
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: action === 'ejecting' ? 1.25 : 1,
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: .6,
          },
        }}
        className="flex justify-center absolute tracking-wider text-secondary-700 w-full py-10"
      >
        <FaFolderOpen
          size={ 24 }
        />
      </motion.div>
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[240px] font-bold leading-none tracking-widest text-secondary-800
        selection:bg-transparent selection:text-secondary-800"
      >
        JOTIT
      </h1>
    </div>
  )
}
