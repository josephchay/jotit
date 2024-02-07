import { Background } from "./components/Background.jsx";
import { Card } from "./components/Document/Card.jsx";

export default function App() {
  return (
    <div
      className="relative w-full h-screen bg-[#FAFEFFFF]"
    >
      <Background />
      <Card />
    </div>
  );
}
