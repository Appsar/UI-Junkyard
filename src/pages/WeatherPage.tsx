import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Weather from "../components/Weather";

export default function WeatherPage() {
  return (
    <div>
      <Navbar />
      <main className="flex justify-center text-4xl font-bold text-orange-400 underline ">
        Weather Page!
      </main>
      <Weather />
      <Footer />
    </div>
  );
}
