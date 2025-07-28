const ToggleThemeButton = ({
  isDark,
  btnClasses = "",
  FirstIcon,
  SecondIcon,
  duration = 200,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={btnClasses}>
      <SecondIcon
        color="white"
        className={`absolute transition-all duration-${duration} ${
          isDark ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
        }`}
      />
      <FirstIcon
        color="black"
        className={`absolute transition-all duration-${duration} ${
          isDark ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
        }`}
      />
    </button>
  );
};

export default ToggleThemeButton;
