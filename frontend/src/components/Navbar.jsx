import { NavLink } from "react-router-dom";
import { Home, Info, Globe, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const styles = {
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      margin: 0,
      padding: "18px 40px",
      background: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
      zIndex: 1000,
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
      flex: 1,
    },

    logoBox: {
      width: "68px",
      height: "68px",
      borderRadius: "50%",
      background: "#065f46",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "34px",
      flexShrink: 0,
    },

    title: {
      fontSize: "30px",
      fontWeight: "800",
      color: "#065f46",
      margin: 0,
    },

    subtitle: {
      fontSize: "15px",
      color: "#64748b",
      marginTop: "6px",
    },

    center: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginRight: "30px",
    },

    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
      color: "#111827",
      fontWeight: "700",
      padding: "13px 18px",
      borderRadius: "14px",
    },

    activeMenu: {
      background: "#ecfdf5",
      color: "#065f46",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },

    languageWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid #d1d5db",
      padding: "10px 14px",
      borderRadius: "14px",
    },

    selectBox: {
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "15px",
      cursor: "pointer",
    },

    helpIcon: {
      color: "#065f46",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.logoBox}>🐍</div>

        <div>
          <h1 style={styles.title}>{t("navbarTitle")}</h1>
          <div style={styles.subtitle}>{t("navbarSubtitle")}</div>
        </div>
      </div>

      <div style={styles.center}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? styles.activeMenu : {}),
          })}
        >
          <Home size={20} />
          {t("home")}
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? styles.activeMenu : {}),
          })}
        >
          <Info size={20} />
          {t("about")}
        </NavLink>
      </div>

      <div style={styles.right}>
        <div style={styles.languageWrapper}>
          <Globe size={20} />
          <select
            onChange={changeLanguage}
            value={i18n.language}
            style={styles.selectBox}
          >
            <option value="en">English</option>
            <option value="si">සිංහල</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>

        <HelpCircle size={26} style={styles.helpIcon} />
      </div>
    </nav>
  );
}

export default Navbar;