import React from "react";
import Button from "../ui/Button";
import site from "../../data/site";
import * as styles from "./ServiceCta.module.css";

const EMAIL = site.email;

/** Abschluss jeder Service-Sektion: konkreter Hook plus zwei Wege zum Kontakt. */
const ServiceCta = ({ hook, subject, note }) => {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
  return (
    <div className={styles.cta} data-reveal>
      <div>
        <h3 className={styles.hook}>{hook}</h3>
        {note && <p className={styles.note}>{note}</p>}
      </div>
      <div className={styles.actions}>
        <Button href={mailto} variant="primary" icon>
          Erstgespräch anfragen
        </Button>
        <Button href="/kontakt" variant="ghost">
          Zum Kontakt
        </Button>
      </div>
    </div>
  );
};

export default ServiceCta;
