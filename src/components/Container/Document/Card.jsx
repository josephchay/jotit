import { AnimatePresence, motion } from "framer-motion";

import { DownloadIcon } from "./DownloadIcon.jsx";
import { useState } from "react";
import { NOTE_DELETION_HOLD_TIME } from "../../../constants/locals.js";

export const Card = ({
  index,
  groupRef,
  id,
  pos,
  content,
  updateItemTag,
  updateItemDescription,
  onAnimationComplete,
  action,
  updateAction,
}) => {
  const [downloadStatus, setDownloadStatus] = useState('idle');

  const updateDownloadStatus = async (status) => {
    setDownloadStatus(status);
  }

  let inputTimer = 400, inputTimeout;

  const debounce = (func) => {
    clearTimeout(inputTimeout);

    inputTimeout = setTimeout(() => {
      func();
    }, inputTimer);
  }

  const handleInputChange = (event, maxLines, maxChars) => {
    const lines = event.target.value.split("\n");
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length <= maxChars) {
        continue;
      }

      let j = 0,
        space = maxChars;

      while (j++ <= maxChars) {
        if (lines[i].charAt(j) === " ") {
          space = j
        }
      }

      lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] ? " " + lines[i + 1] : "");
      lines[i] = lines[i].substring(0, space);
    }

    event.target.value = lines.slice(0, maxLines).join("\n");

    if (start === end) {
      event.target.setSelectionRange(start, end);
    }
  };

  const moveToFront = () => {
    // Increase zIndex to bring the card to the front
    const highestZIndex = Array.from(groupRef.current.children)
      .map(card => parseInt(window.getComputedStyle(card).zIndex) || 1)
      .reduce((max, zIndex) => Math.max(max, zIndex), 0);

    groupRef.current.children[index].style.zIndex = highestZIndex + 1;

    // Update the z-index for other cards to maintain proper order
    Array.from(groupRef.current.children).forEach((card, i) => {
      if (i !== index) {
        const currentZIndex = parseInt(window.getComputedStyle(card).zIndex) || 1;
        if (currentZIndex > 1) {
          card.style.zIndex = currentZIndex - 1;
        }
      }
    });
  }

  let mouseHoldTimer = NOTE_DELETION_HOLD_TIME, mouseHoldTimeout;

  const handleMouseDown = () => {
    moveToFront();

    mouseHoldTimeout = setTimeout(() => {
      updateAction('delete');
    }, mouseHoldTimer);
  }

  const handleMouseUp = () => {
    clearTimeout(mouseHoldTimeout);

    updateAction('idle');
  }

  const handleClick = () => {
    if (downloadStatus === 'completed') {
      updateDownloadStatus('idle');
    }
  }

  return (
    <motion.div
      initial={{
        scale: 0,
        y: 100,
      }}
      animate={{
        scale: 1,
        y: 0,
      }}
      transition={{
        scale: {
          delay: action === 'fresh' ? 1.2 + index * .2 : 0,
          ease: [0.2, 0.05, -0.01, 0.9],
          duration: 1,
        },
        x: {
          delay: action === 'fresh' ? 1.4 + index * .2 : .2,
          ease: [0.2, 0.4, -0.01, 1],
          duration: 1.4,
        },
        y: {
          delay: action === 'fresh' ? 1.4 + index * .2 : .2,
          ease: [0.2, 0.4, -0.01, 1],
          duration: 1.4,
        },
      }}
      style={{
        position: 'relative',
      }}
      onAnimationComplete={ onAnimationComplete }
    >
      <motion.div
        dragConstraints={ groupRef }
        drag
        dragElastic={ .2 }
        dragTransition={{
          bounceStiffness: 300,
          bounceDamping: 10,
        }}
        whileDrag={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 1.1,
        }}
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
        }}
        onDoubleClick={ e => e.stopPropagation() } // prevent adding a new card when double clicking
        onClick={ handleClick }
        onMouseDown={ handleMouseDown }
        onMouseUp={ handleMouseUp }
      >
        <div
          className="relative w-64 h-80 flex-shrink-0 rounded-3xl px-5 py-6 bg-gray-200/50 backdrop-blur-md overflow-hidden"
        >
          <input
            type="text"
            defaultValue={ content.tag }
            placeholder="Tag this Jot"
            onChange={ e => {
              handleInputChange(e, 1, 10)
              debounce(() => updateItemTag(e.target.value, id))
            }}
            onPointerDownCapture={ e => e.stopPropagation() }
            className="mb-3 resize-none bg-transparent outline-none text-xs font-bold tracking-wider text-secondary-900 selection:bg-gray-300/50 selection:text-secondary-900"
          ></input>
          <textarea
            defaultValue={ content.description }
            placeholder="Jot this note"
            rows={ 8 }
            onChange={ e => {
              handleInputChange(e, 8, 16)
              debounce(() => updateItemDescription(e.target.value, id))
            }}
            onPointerDownCapture={ e => e.stopPropagation() }
            className="text-md w-full resize-none bg-transparent outline-none text-secondary-700 selection:bg-gray-300/50 selection:text-secondary-900"
          ></textarea>
          <div
            className="absolute bottom-0 left-0 w-full px-8 py-3 bg-gray-300/30"
          >
            <div
              className="flex items-center justify-between"
            >
              <DownloadIcon
                tag={ content.tag }
                description={ content.description }
                type="pdf"
                updateDownloadStatus={ updateDownloadStatus }
              />
              <DownloadIcon
                tag={ content.tag }
                description={ content.description }
                type="word"
                updateDownloadStatus={ updateDownloadStatus }
              />
              <DownloadIcon
                tag={ content.tag }
                description={ content.description }
                updateDownloadStatus={ updateDownloadStatus }
              />
            </div>
          </div>
          <AnimatePresence>
            {
              (downloadStatus === 'completed' || downloadStatus === 'downloading') && (
                <motion.div
                  key={ `${id}-${index}-${downloadStatus}` }
                  initial={{
                    y: 100,
                  }}
                  animate={{
                    y: 0,
                    backgroundColor: downloadStatus === 'completed' ? 'rgba(74 222 128 1)' : 'rgba(96 165 250 1)',
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
                    { downloadStatus.charAt(0).toUpperCase() + downloadStatus.slice(1) }
                  </h2>
                </motion.div>
              )
            }
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
