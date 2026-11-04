export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// "mr-mime" -> "Mr Mime"
export function formatName(name: string) {
  return name.split("-").map(capitalize).join(" ");
}

export function formatNumber(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}
