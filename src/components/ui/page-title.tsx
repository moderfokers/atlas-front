export const PageTitle = ({ children }) => {
  return (
    <div className="flex items-center">
      <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
      <div className="flex-grow border-t border-gray-300 ml-4"></div>
    </div>
  );
};
