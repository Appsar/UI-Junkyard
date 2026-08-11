import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Weather from "../components/Weather";

export default function WeatherPage() {
  return (
    <div className="bg-sky-100 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex justify-center text-5xl mb-10 mt-2 font-bold text-orange-400 underline ">
        Weather Page!
      </main>
      <Weather />
      <Footer />
    </div>
  );
}
