const Spinner = ({ size = 5 }) => {
  return (
    <div
      className="border-4 border-blue-700 border-t-transparent rounded-full spin-fast"
      style={{
        width: `calc(var(--spacing) * ${size})`,
        height: `calc(var(--spacing) * ${size})`,
      }}
    ></div>
  );
};

export default Spinner;
