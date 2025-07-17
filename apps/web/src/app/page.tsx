import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Snakebyte</h1>
      <p className="text-lg mb-4 text-gray-600">Your course learning platform</p>
      <Link 
        href="/courses"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Browse Courses
      </Link>
    </main>
  );
}