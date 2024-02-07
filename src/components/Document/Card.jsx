import { DownloadIcon } from "./DownloadIcon.jsx";

export const Card = () => {
  return (
    <div
      className="fixed z-[3] w-full h-full"
    >
      <div
        className="relative w-60 h-80 rounded-[30px] px-4 py-10 bg-blue-50/50 overflow-hidden"
      >
        <p
          className="text-md text-secondary-700 selection:bg-secondary-200/50 selection:text-secondary-900"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio tincidunt luctus
        </p>
        <div
          className="absolute bottom-0 left-0 w-full px-8 py-4 bg-secondary-100/30"
        >
          <div
            className="flex items-center justify-between"
          >
            <DownloadIcon type="pdf" />
            <DownloadIcon type="word" />
            <DownloadIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
