import type { ButtonType } from "../types/ButtonType";
import "../style/button.css";

export const Button = ({ text, onClick, isActive }: ButtonType) => {
  return (
    <button
      className={isActive ? "filter__btn active" : "filter__btn"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
