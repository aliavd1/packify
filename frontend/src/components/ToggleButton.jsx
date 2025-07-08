const ToggleButton = ({
  open,
  btnClasses = "",
  firstIcon,
  firstIconColor = "white",
  secondIcon,
  secondIconColor = "white",
  duration = 200,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={btnClasses}>
      <i
        className={`far ${secondIcon} fa-xl absolute transition-all duration-${duration} 
        text-${secondIconColor} ${
          open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
        }`}
      ></i>
      <i
        className={`far ${firstIcon} fa-xl absolute transition-all duration-${duration} 
        text-${firstIconColor} ${
          open ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
        }`}
      ></i>
    </button>
  );
};

export default ToggleButton;
