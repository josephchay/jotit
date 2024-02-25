export const CardNote = ({
  defaultVal = '',
  placeholder = "Jot this Note",
  onChange,
}) => {
  return (
    <>
      <textarea
        defaultValue={ defaultVal }
        placeholder={ placeholder }
        autoFocus={ true }
        rows={ 8 }
        onChange={ onChange }
        onPointerDownCapture={ e => e.stopPropagation() }
        className="text-md w-full resize-none bg-transparent outline-none text-secondary-700 selection:bg-gray-300/50
        selection:text-secondary-900"
      ></textarea>
    </>
  );
}
