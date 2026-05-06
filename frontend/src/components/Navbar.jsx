import { NavLink } from "react-router-dom";
import {
  Home,
  Info,
  Globe,
  HelpCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const styles = {
    nav: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      background: "#ffffff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      borderBottom: "1px solid #e5e7eb",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
    },

    logoBox: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      background: "#065f46",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "34px",
      fontWeight: "bold",
      flexShrink: 0,
    },

    titleSection: {
      display: "flex",
      flexDirection: "column",
    },

    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#065f46",
      margin: 0,
    },

    subtitle: {
      fontSize: "15px",
      color: "#6b7280",
      marginTop: "6px",
    },

    center: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
    },

    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
      color: "#111827",
      fontWeight: "600",
      padding: "14px 18px",
      borderRadius: "14px",
    },

    activeMenu: {
      background: "#ecfdf5",
      color: "#065f46",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
    },

    languageWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    // Native select with a visible chevron via appearance + background trick
    selectBox: {
      border: "1px solid #d1d5db",
      padding: "12px 40px 12px 16px",
      borderRadius: "14px",
      fontSize: "15px",
      outline: "none",
      cursor: "pointer",
      background: "#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 12px center",
      WebkitAppearance: "none",
      MozAppearance: "none",
      appearance: "none",
      color: "#111827",
      minWidth: "150px",
    },

    helpIcon: {
      color: "#065f46",
      cursor: "pointer",
    },

    divider: {
      width: "1px",
      height: "60px",
      background: "#e5e7eb",
      marginLeft: "30px",
      marginRight: "30px",
    },
  };

  return (
    <nav style={styles.nav}>
      {/* LEFT */}
      <div style={styles.left}>
        <div style={styles.logoBox}>🐍</div>

        <div style={styles.titleSection}>
          <h1 style={styles.title}>{t("navbarTitle")}</h1>
          <span style={styles.subtitle}>{t("navbarSubtitle")}</span>
        </div>
      </div>

      {/* CENTER */}
      <div style={styles.center}>
        <div style={styles.divider}></div>

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

      {/* RIGHT */}
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