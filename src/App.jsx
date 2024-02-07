import { Background } from "./components/Background.jsx";
import { Document } from "./components/Document.jsx";

export default function App() {
  return (
    <div
      className="relative w-full h-screen bg-primary-50"
    >
      <Background />
      <Document />
    </div>
  );
}
