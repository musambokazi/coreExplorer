export default function StatusText({ children, tone = "neutral" }) {
  const role = tone === "error" ? "alert" : "status";

  return (
    <p className={`status-text ${tone === "error" ? "error" : ""}`.trim()} role={role}>
      {children}
    </p>
  );
}
