

function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-300"
    >
      {children}
    </button>
  );
}