export interface Point {
  x: number;
  y: number;
}

export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angle: number,
): Point {
  const rad = (angle * Math.PI) / 180;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const angle = endAngle - startAngle;

  // 🔥 FULL CIRCLE FIX
  if (Math.abs(angle) >= 360) {
    const midAngle = startAngle + 180;

    const start = polarToCartesian(cx, cy, r, startAngle);
    const mid = polarToCartesian(cx, cy, r, midAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);

    return `
      M ${start.x} ${start.y}
      A ${r} ${r} 0 1 1 ${mid.x} ${mid.y}
      A ${r} ${r} 0 1 1 ${end.x} ${end.y}
    `;
  }

  // обычная дуга
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);

  const largeArcFlag = angle <= 180 ? "0" : "1";

  return `
    M ${start.x} ${start.y}
    A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
  `;
}
