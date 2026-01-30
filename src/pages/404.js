import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/Layout";
import Seo from "../components/Seo";
import Button from "../components/ui/Button";
import { Home, Search, ArrowLeft } from "lucide-react";
import * as styles from "./404.module.css";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={styles.notFound}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.errorCode}>404</div>
            <h1 className={styles.title}>Seite nicht gefunden</h1>
            <p className={styles.description}>
              Die Seite, die Sie suchen, existiert leider nicht oder wurde
              verschoben.
            </p>

            <div className={styles.actions}>
              <Button href="/" variant="primary">
                <Home size={20} />
                Zur Startseite
              </Button>
              <Button href="/services" variant="secondary">
                <Search size={20} />
                Services ansehen
              </Button>
            </div>

            <div className={styles.links}>
              <p className={styles.linksTitle}>
                Vielleicht finden Sie hier, was Sie suchen:
              </p>
              <div className={styles.linkGrid}>
                <Link to="/" className={styles.link}>
                  <ArrowLeft size={16} />
                  <span>Home</span>
                </Link>
                <Link to="/services" className={styles.link}>
                  <ArrowLeft size={16} />
                  <span>Services</span>
                </Link>
                <Link to="/ueber-mich" className={styles.link}>
                  <ArrowLeft size={16} />
                  <span>Über mich</span>
                </Link>
                <Link to="/kontakt" className={styles.link}>
                  <ArrowLeft size={16} />
                  <span>Kontakt</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => (
  <Seo
    title="404 – Seite nicht gefunden"
    description="Die gesuchte Seite konnte nicht gefunden werden."
  />
);
