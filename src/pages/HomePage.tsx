import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center text-4xl font-bold text-cyan-700">
        Welcome to UI Junkyard
      </h1>
      <Footer />
    </div>
  );
}
