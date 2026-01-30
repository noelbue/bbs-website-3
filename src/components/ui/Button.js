import * as styles from "./Button.module.css";

const Button = ({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) => {
  const buttonClass =
    variant === "primary" ? styles.btnPrimary : styles.btnSecondary;

  if (href) {
    return (
      <a href={href} className={`${buttonClass} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
