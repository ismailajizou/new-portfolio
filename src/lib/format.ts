const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "2025-02" -> "Feb 2025"
export function formatMonth(value: string | null | undefined) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : value;
}

export function formatRange(
  start: string | null | undefined,
  end: string | null | undefined,
  { yearsOnly = false } = {},
) {
  const show = (value: string | null | undefined) =>
    yearsOnly ? (value?.slice(0, 4) ?? "") : formatMonth(value);
  const from = show(start);
  const to = end ? show(end) : "Present";
  if (!from) return to;
  return from === to ? from : `${from} – ${to}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
