export function deriveFamilyName(customerName: string | null | undefined): string {
  const trimmed = customerName?.trim();

  if (!trimmed) {
    return "New Family";
  }

  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    return `${parts[0]} Family`;
  }

  const lastName = parts[parts.length - 1];
  return `${lastName} Family`;
}
