import Navigation from "./Navigation";
import Footer from "./Footer";
import * as styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
