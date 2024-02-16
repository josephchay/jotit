export const CardContent = ({ children }) => {
  return (
    <div
      className="relative w-64 h-80 flex-shrink-0 rounded-3xl px-5 py-6 bg-gray-200/50 backdrop-blur-md overflow-hidden"
    >
      { children }
    </div>
  )
}
