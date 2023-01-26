export default function formatDate(date) {
  return new Date(date).toUTCString().replace(" 00:00:00 GMT","")
}