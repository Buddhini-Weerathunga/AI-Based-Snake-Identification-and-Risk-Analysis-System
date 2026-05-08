import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft, RotateCcw, CheckCircle, Zap, FlaskConical,
  ShieldCheck, Droplets, AlertTriangle, MapPin, Activity,
  Clock, AlertOctagon, ShieldAlert, Info,
} from "lucide-react";

function ResultPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const { snakeKey, confidence, image } = state;
  const sp = `snakes.${snakeKey}`;
  const confidenceNum = parseFloat(confidence);
  const riskLevel = t(`${sp}.riskLevel`);
  const isHigh = ["High Risk", "ඉහළ අවදානම", "அதிக ஆபத்து"].includes(riskLevel);

  const detailRows = [
    { icon: <Zap size={16} color="#fff" />, bg: "#10b981", label: t("snakeName"), value: <strong>{t(`${sp}.name`)}</strong> },
    { icon: <FlaskConical size={16} color="#fff" />, bg: "#6366f1", label: t("scientificName"), value: <em style={{ color: "#475569" }}>{t(`${sp}.scientificName`)}</em> },
    {
      icon: <ShieldCheck size={16} color="#fff" />, bg: "#3b82f6", label: t("confidence"),
      value: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <strong>{confidence}</strong>
          <div style={{ width: "120px", height: "7px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${confidenceNum}%`, height: "100%", background: "#3b82f6", borderRadius: "4px" }} />
          </div>
        </div>
      ),
    },
    {
      icon: <Droplets size={16} color="#fff" />, bg: "#8b5cf6", label: t("venomLevel"),
      value: (
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700, color: "#7c3aed" }}>{t(`${sp}.venomLevel`)}</div>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>{t(`${sp}.venomNote`)}</div>
        </div>
      ),
    },
    {
      icon: <AlertTriangle size={16} color="#fff" />, bg: "#f97316", label: t("riskLevel"),
      value: (
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700, color: isHigh ? "#dc2626" : "#16a34a" }}>{riskLevel}</div>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>{t(`${sp}.riskNote`)}</div>
        </div>
      ),
    },
    { icon: <MapPin size={16} color="#fff" />, bg: "#059669", label: t("habitat"), value: <span style={{ color: "#334155" }}>{t(`${sp}.habitat`)}</span> },
    { icon: <Activity size={16} color="#fff" />, bg: "#0ea5e9", label: t("behavior"), value: <span style={{ color: "#334155" }}>{t(`${sp}.behavior`)}</span> },
    { icon: <Clock size={16} color="#fff" />, bg: "#64748b", label: t("activeTime"), value: <span style={{ color: "#334155" }}>{t(`${sp}.activeTime`)}</span> },
  ];

  const firstAidSteps = t(`${sp}.firstAid`, { returnObjects: true });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "104px", boxSizing: "border-box" }}>

      {/* Top Bar */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 30px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")} style={btnStyle("#f1f5f9", "#0f172a")}>
          <ArrowLeft size={16} /> {t("backToHome", "Back to Home")}
        </button>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#064e3b" }}>
            {t("resultPageTitle", "Snake Classification Result")}
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
            <CheckCircle size={15} color="#059669" />
            <span style={{ fontSize: "13px", color: "#059669", fontWeight: "600" }}>{t("analysisSuccess", "Analysis completed successfully")}</span>
          </div>
        </div>
        <button onClick={() => navigate("/")} style={btnStyle("#f1f5f9", "#0f172a")}>
          <RotateCcw size={16} /> {t("newSearch", "New Search")}
        </button>
      </div>

      {/* Main Grid */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 30px 30px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Uploaded Image */}
          <div style={cardStyle}>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", top: "12px", left: "12px",
                background: "#059669", color: "white",
                fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px",
              }}>
                {t("uploadedImage", "Uploaded Image")}
              </span>
              <img src={image} alt="snake" style={{ width: "100%", maxHeight: "320px", objectFit: "cover", borderRadius: "14px", display: "block" }} />
            </div>
          </div>

          {/* First Aid */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldAlert size={20} color="#059669" />
              </div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>{t("firstAidTitle", "First Aid Guidance")}</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Array.isArray(firstAidSteps) ? firstAidSteps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", padding: "12px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px", fontWeight: "700", color: "#475569" }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "13px", color: "#0f172a" }}>{step.title}</div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{step.desc}</div>
                  </div>
                </div>
              )) : (
                <p style={{ fontSize: "14px", color: "#64748b" }}>{t(`${sp}.advice`)}</p>
              )}
            </div>

            <div style={{ marginTop: "14px", padding: "10px 14px", background: isHigh ? "#fef2f2" : "#f0fdf4", borderRadius: "10px", border: `1px solid ${isHigh ? "#fecaca" : "#bbf7d0"}`, display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <Info size={15} color={isHigh ? "#dc2626" : "#059669"} style={{ flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontSize: "12px", color: isHigh ? "#991b1b" : "#166534" }}>
                <strong>{t("note", "Note")}:</strong> {t(`${sp}.firstAidNote`)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Identification Details */}
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 16px", fontSize: "17px", fontWeight: "700", color: "#064e3b" }}>
              {t("identificationDetails", "Identification Details")}
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {detailRows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: "11px 8px", borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: row.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {row.icon}
                        </div>
                        <span style={{ fontWeight: "600", fontSize: "14px", color: "#0f172a" }}>{row.label}</span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 8px", borderBottom: "1px solid #f1f5f9", textAlign: "right", fontSize: "14px" }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bite Risk Warning */}
          <div style={{ ...cardStyle, border: `1px solid ${isHigh ? "#fecaca" : "#bbf7d0"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <AlertOctagon size={22} color={isHigh ? "#dc2626" : "#059669"} />
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: isHigh ? "#dc2626" : "#059669" }}>
                {t("biteRiskTitle", "Bite Risk Warning")}
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {(t(`${sp}.biteRisk`, { returnObjects: true }) || []).map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px", background: i === 2 ? (isHigh ? "#fef2f2" : "#f0fdf4") : "transparent", borderRadius: "8px" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: "13px", color: i === 2 ? (isHigh ? "#991b1b" : "#166534") : "#334155", fontWeight: i === 2 ? "700" : "400" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div style={{ textAlign: "center", padding: "16px 30px 30px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Info size={15} color="#94a3b8" />
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
            {t("fullDisclaimer", "This identification is based on AI image analysis and may not be 100% accurate. When in doubt, always consult a wildlife expert or medical professional.")}
          </span>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
};

const btnStyle = (bg, color) => ({
  display: "flex", alignItems: "center", gap: "6px",
  background: bg, color, border: "1px solid #e2e8f0",
  padding: "8px 16px", borderRadius: "10px",
  fontSize: "13px", fontWeight: "600", cursor: "pointer",
});

export default ResultPage;
