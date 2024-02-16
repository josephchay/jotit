export const DownloadOptions = ({ children }) => {
  return (
    <div
      className="absolute bottom-0 left-0 pointer-events-none w-full px-8 py-3 bg-gray-300/30"
    >
      <div
        className="flex items-center justify-between"
      >
        { children }
      </div>
    </div>
  )
}
