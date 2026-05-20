import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Todos from "../components/Todos";

export default function TodoPage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center text-4xl font-bold text-green-800">
        Welcome to the Todo Page!
      </h1>
      <Todos />
      <Footer />
    </div>
  );
}
