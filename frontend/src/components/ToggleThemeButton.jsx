const ToggleThemeButton = ({
  isDark,
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
          isDark ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
        }`}
      ></i>
      <i
        className={`far ${firstIcon} fa-xl absolute transition-all duration-${duration} 
        text-${firstIconColor} ${
          isDark ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
        }`}
      ></i>
    </button>
  );
};

export default ToggleThemeButton;
