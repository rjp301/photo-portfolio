export default function formatDate(date: string | Date): string {
  return new Date(date).toUTCString().replace(" 00:00:00 GMT", "");
}
