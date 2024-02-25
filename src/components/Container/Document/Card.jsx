import { forwardRef, useState } from "react";

import { CardTag } from "./CardTag.jsx";
import { CardNote } from "./CardNote.jsx";
import { DownloadOptions, DownloadToast, DownloadPanel, DownloadIcon } from "./Actionables/locals";
import { CardContent } from "./CardContent.jsx";
import { CardFresh } from "./CardFresh.jsx";
import { CardDraggable } from "./CardDraggable.jsx";
import { NOTE_DELETION_HOLD_TIME } from "../../../constants/locals.js";
import { Actions } from "../../../enums/Actions.js";
import { DownloadStatus } from "../../../enums/DownloadStatus.js";

const Card = forwardRef(({
  index,
  groupRef,
  id,
  pos,
  content,
  updateTag,
  updateDescription,
  onAnimationComplete,
  action,
  updateAction,
  onTrash,
  onTrashable,
}, draggableRef) => {
  const [downloadStatus, setDownloadStatus] = useState(DownloadStatus.IDLE);

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
      updateAction(Actions.THRASHING);
    }, mouseHoldTimer);
  }

  const handleMouseUp = () => {
    clearTimeout(mouseHoldTimeout);

    updateAction(Actions.IDLE);
  }

  const handleClick = () => {
    if (downloadStatus === DownloadStatus.COMPLETED) {
      updateDownloadStatus(DownloadStatus.IDLE);
    }
  }

  return (
    <CardFresh
      index={ index }
      pos={ pos }
      action={ action }
      onAnimationComplete={ onAnimationComplete }
    >
      <CardDraggable
        id={ id }
        pos={ pos }
        constraints={ groupRef }
        action={ action }
        onClick={ handleClick }
        onMouseDown={ handleMouseDown }
        onMouseUp={ handleMouseUp }
        onTrash={ onTrash }
        onTrashable={ onTrashable }
        ref={ draggableRef }
      >
        <CardContent>
          <CardTag
            defaultVal={ content.tag }
            onChange={ e => {
              handleInputChange(e, 1, 10)
              debounce(() => updateTag(e.target.value, id))
            }}
          />
          <CardNote
            defaultVal={ content.description }
            onChange={ e => {
              handleInputChange(e, 8, 16)
              debounce(() => updateDescription(e.target.value, id))
            }}
          />
          <DownloadPanel>
            <DownloadOptions>
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
            </DownloadOptions>
            <DownloadToast
              status={ downloadStatus }
            />
          </DownloadPanel>
        </CardContent>
      </CardDraggable>
    </CardFresh>
  );
});

Card.displayName = "Card";

export { Card };
