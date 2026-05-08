import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Zap,
  FlaskConical,
  ShieldCheck,
  Droplets,
  AlertTriangle,
  ScanSearch,
  ShieldAlert,
} from "lucide-react";

function PredictionResult({ result }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("details");

  const s = {
    card: {
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      minHeight: "260px",
      overflow: "hidden",
    },
    tabBar: {
      display: "flex",
      borderBottom: "2px solid #f1f5f9",
    },
    tab: (active) => ({
      flex: 1,
      padding: "14px",
      fontSize: "15px",
      fontWeight: "600",
      textAlign: "center",
      cursor: "pointer",
      border: "none",
      background: "none",
      color: active ? "#065f46" : "#94a3b8",
      borderBottom: active ? "2px solid #065f46" : "2px solid transparent",
      marginBottom: "-2px",
      transition: "all 0.2s",
    }),
    body: {
      padding: "24px 28px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    cell: {
      padding: "12px 8px",
      fontSize: "15px",
      verticalAlign: "middle",
      borderBottom: "1px solid #f1f5f9",
    },
    labelCell: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
      color: "#0f172a",
      whiteSpace: "nowrap",
    },
    valueCell: {
      textAlign: "right",
      color: "#334155",
    },
    iconCircle: (bg) => ({
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }),
    riskBadge: (isHigh) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: isHigh ? "#fee2e2" : "#dcfce7",
      color: isHigh ? "#991b1b" : "#166534",
      padding: "12px 18px",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "15px",
      width: "100%",
      marginBottom: "20px",
      boxSizing: "border-box",
    }),
    adviceBox: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "14px",
      padding: "18px",
      fontSize: "15px",
      color: "#334155",
      lineHeight: "1.7",
    },
    adviceTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: "8px",
    },
    emptyWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "260px",
      gap: "16px",
      padding: "30px",
    },
    emptyIconRing: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      background: "#f0fdf4",
      border: "2px dashed #86efac",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emptyTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#0f172a",
      margin: 0,
    },
    emptySubtitle: {
      fontSize: "13px",
      color: "#94a3b8",
      margin: 0,
      textAlign: "center",
      maxWidth: "220px",
      lineHeight: "1.5",
    },
  };

  if (!result) {
    return (
      <div style={s.card}>
        <div style={s.emptyWrapper}>
          <div style={s.emptyIconRing}>
            <ScanSearch size={32} color="#22c55e" />
          </div>
          <p style={s.emptyTitle}>{t("predictionEmptyTitle", "No Prediction Yet")}</p>
          <p style={s.emptySubtitle}>
            {t("predictionEmpty", "Upload a snake image to see the identification result here.")}
          </p>
        </div>
      </div>
    );
  }

  const snakePath = `snakes.${result.snakeKey}`;
  const confidenceNum = parseFloat(result.confidence);
  const riskLevel = t(`${snakePath}.riskLevel`);
  const isHigh = riskLevel === "High Risk" || riskLevel === "ඉහළ අවදානම" || riskLevel === "அதிக ஆபத்து";

  const rows = [
    {
      icon: <Zap size={17} color="#fff" />,
      iconBg: "#10b981",
      label: t("snakeName"),
      value: <span style={{ fontWeight: 600 }}>{t(`${snakePath}.name`)}</span>,
    },
    {
      icon: <FlaskConical size={17} color="#fff" />,
      iconBg: "#6366f1",
      label: t("scientificName"),
      value: <span style={{ fontStyle: "italic", color: "#475569" }}>{t(`${snakePath}.scientificName`)}</span>,
    },
    {
      icon: <ShieldCheck size={17} color="#fff" />,
      iconBg: "#3b82f6",
      label: t("confidence"),
      value: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end" }}>
          <span style={{ fontWeight: 600 }}>{result.confidence}</span>
          <div style={{ width: "100px", height: "7px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${confidenceNum}%`, height: "100%", background: "#3b82f6", borderRadius: "4px" }} />
          </div>
        </div>
      ),
    },
    {
      icon: <Droplets size={17} color="#fff" />,
      iconBg: "#8b5cf6",
      label: t("venomLevel"),
      value: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
          <span style={{ fontWeight: 700, color: "#7c3aed", fontSize: "14px" }}>{t(`${snakePath}.venomLevel`)}</span>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>{t(`${snakePath}.venomNote`)}</span>
        </div>
      ),
    },
    {
      icon: <AlertTriangle size={17} color="#fff" />,
      iconBg: "#f97316",
      label: t("riskLevel"),
      value: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
          <span style={{ fontWeight: 700, color: isHigh ? "#dc2626" : "#16a34a", fontSize: "14px" }}>{riskLevel}</span>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>{t(`${snakePath}.riskNote`)}</span>
        </div>
      ),
    },
  ];

  return (
    <div style={s.card}>
      {/* Tab Bar */}
      <div style={s.tabBar}>
        <button style={s.tab(activeTab === "details")} onClick={() => setActiveTab("details")}>
          🐍 {t("tabDetails", "Snake Details")}
        </button>
        <button style={s.tab(activeTab === "safety")} onClick={() => setActiveTab("safety")}>
          🛡️ {t("tabSafety", "Safety Advice")}
        </button>
      </div>

      <div style={s.body}>
        {/* Details Tab */}
        {activeTab === "details" && (
          <table style={s.table}>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={s.cell}>
                    <div style={s.labelCell}>
                      <div style={s.iconCircle(row.iconBg)}>{row.icon}</div>
                      {row.label}
                    </div>
                  </td>
                  <td style={{ ...s.cell, ...s.valueCell }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Safety Tab */}
        {activeTab === "safety" && (
          <div>
            <div style={s.riskBadge(isHigh)}>
              <ShieldAlert size={20} />
              {riskLevel}
            </div>
            <div style={s.adviceTitle}>{t("safetyAdvice")}</div>
            <div style={s.adviceBox}>{t(`${snakePath}.advice`)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionResult;
