export default function Navbar({ onLoad }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          SalesIQ
        </h1>

        {/* Button */}
        <button
          onClick={onLoad}
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-sm sm:text-base px-4 py-2 rounded-md shadow-sm"
        >
          Load Sample Data
        </button>

      </div>
    </header>
  );
}