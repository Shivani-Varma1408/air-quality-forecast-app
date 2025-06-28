import { useEffect } from "react";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  useEffect(() => {
    // Optional Firestore read test
    async function fetchTestData() {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
        console.log("✅ Firestore connected!");
      } catch (error) {
        console.error("❌ Firestore error:", error);
      }
    }

    fetchTestData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Air Quality Forecast App 🌍</h1>
      <p className="text-lg">React + Tailwind + Firebase setup is complete!</p>
      <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
        Get Started 🚀
      </button>
    </div>
  );
}

export default App;
