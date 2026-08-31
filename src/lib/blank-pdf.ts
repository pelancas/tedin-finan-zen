/**
 * Builds a minimal, valid, blank single-page PDF entirely in-browser —
 * placeholder deliverable until the real report-generation backend exists.
 * Offsets in the xref table are computed from the actual object strings
 * instead of hardcoded, so the file stays valid if the objects ever change.
 */
function buildBlankPdf(): string {
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << >> >>\nendobj\n",
  ];

  const header = "%PDF-1.4\n";
  let body = "";
  const offsets: number[] = [];
  let offset = header.length;
  for (const obj of objects) {
    offsets.push(offset);
    body += obj;
    offset += obj.length;
  }

  const xrefStart = header.length + body.length;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += `${off.toString().padStart(10, "0")} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return header + body + xref + trailer;
}

export function downloadBlankPdf(filename: string) {
  const blob = new Blob([buildBlankPdf()], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
