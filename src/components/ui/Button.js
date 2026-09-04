import React from "react";
import { Link } from "gatsby";
import { ArrowRight } from "lucide-react";
import * as styles from "./Button.module.css";

const Button = ({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = false,
  onClick,
  type = "button",
  className = "",
}) => {
  const classes = [
    styles.btn,
    variant === "primary"
      ? styles.btnPrimary
      : variant === "ghost"
        ? styles.btnGhost
        : styles.btnSecondary,
    size === "sm" ? styles.btnSm : "",
    className,
  ]
    .join(" ")
    .trim();

  const content = (
    <>
      {children}
      {icon && <ArrowRight className={styles.icon} size={16} aria-hidden="true" />}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link to={href} className={classes}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
