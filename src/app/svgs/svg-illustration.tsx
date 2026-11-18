export default function Illustration({ cid }: { cid?: string }) {
  return (
    <div
      data-cid={cid}
      className="w-full flex items-center justify-center overflow-visible my-4 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 1000 292"
        className="w-full h-auto max-w-full block overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="281"
          dominantBaseline="alphabetic"
          textAnchor="middle"
          fill="#F6F1E4"
          style={{
            fontFamily: "Inter, 'Inter Placeholder', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
          fontSize="372"
        >
          AKAL
        </text>
      </svg>
    </div>
  );
}
