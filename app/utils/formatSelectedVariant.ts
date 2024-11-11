export function formatSelectedVariant(variant: string): string {
  const parts = variant.split("-");

  if (parts.length === 3) {
    const [value, , type] = parts; // Destructure the parts
    return `${value}${type}`;
  }

  return "";
}
