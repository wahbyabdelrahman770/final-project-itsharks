import { format, parseISO } from "date-fns";

export default function formatDate(date) {
    return date ? format(parseISO(date), "PP") : "";
}