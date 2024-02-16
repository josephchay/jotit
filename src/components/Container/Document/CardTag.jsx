export const CardTag = ({
  defaultVal = '',
  placeholder = 'Tag this note',
  onChange
}) => {
  return (
    <>
      <input
        type="text"
        defaultValue={ defaultVal }
        placeholder={ placeholder }
        onChange={ onChange }
        onPointerDownCapture={ e => e.stopPropagation() }
        className="mb-3 resize-none bg-transparent outline-none text-xs font-bold tracking-wider text-secondary-900 selection:bg-gray-300/50 selection:text-secondary-900"
      ></input>
    </>
  )
}
