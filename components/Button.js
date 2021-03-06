export const Button = (props) => {
  return (
    <button
      className="bg-green-600 hover:bg-green-500 text-white font-bold text-xl py-2 px-4 border-b-4 border-green-800 hover:border-green-600 rounded-xl transition-all"
      {...props}
    />
  );
};
