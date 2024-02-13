import { motion } from "framer-motion";

export const Background = () => {
  const actionText = 'Documents';

  return (
    <div
      className="fixed z-[2] w-full h-screen"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: '0.25em',
        }}
        animate={{
          opacity: 1,
          y: `0em`,
          transition: {
            duration: 1,
            ease: [0.2, 0.65, 0.3, 0.9],
          },
        }}
        className="flex justify-center absolute tracking-wider text-secondary-700 w-full py-10"
      >
        {
          actionText.split('').map((char, index) => (
            <motion.span
              initial={{
                opacity: 0,
                y: '0.25em',
              }}
              animate={{
                opacity: 1,
                y: `0em`,
                transition: {
                  duration: 1,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: index * 0.1,
                },
              }}
              key={ index }
              className="inline-block mr-[-0.05em]"
            >
              { char }
            </motion.span>
          ))
        }
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
