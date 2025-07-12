import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import ArrowStepper from "../components/ArrowStepper";

const Home = () => {
  const steps = ["Complete info", "Select icon", "Select app", "Confirm"];
  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") || "false");
  });

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="page p-5">
      <div className="flex justify-between items-center px-4 pt-4">
        <ToggleThemeButton
          isDark={isDark}
          btnClasses="fixed bottom-5 right-5 w-14 h-14 bg-neutral-300 rounded-full shadow-lg 
          hover:bg-neutral-200 flex justify-center items-center dark:bg-neutral-700 
          dark:hover:bg-neutral-600 cursor-pointer active:scale-90 will-change-transform duration-300"
          firstIcon="fa-sun-bright"
          firstIconColor="black"
          secondIcon="fa-moon"
          secondIconColor="white"
          duration={300}
          onClick={() => setIsDark((value) => !value)}
        />
      </div>

      <ArrowStepper steps={steps} />
    </div>
  );
};

export default Home;
