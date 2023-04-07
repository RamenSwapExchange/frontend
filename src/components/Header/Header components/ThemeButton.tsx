import "./ThemeButton.scss";
import { useState } from "react";

const ThemeButton = () => {
  enum ETheme {
    light,
    dark,
  }
  const [theme, setTheme] = useState<ETheme>(ETheme.light);
  
  return (
    <div className="theme-div">
      <div className="theme-headear">Theme:</div>
      <div className="theme-buttons">
        <div
          className={theme == ETheme.light ? "active-theme" : ""}
          onClick={() => {
            setTheme(ETheme.light);
          }}
        >
          light
        </div>
        <div
          className={theme == ETheme.dark ? "active-theme" : ""}
          onClick={() => {
            setTheme(ETheme.dark);
          }}
        >
          dark
        </div>
      </div>
    </div>
  );
};

export default ThemeButton;
