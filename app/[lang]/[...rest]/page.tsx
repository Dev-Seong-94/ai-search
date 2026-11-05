import { notFound } from "next/navigation";

/** Routes unknown URLs to the localized not-found page inside the layout. */
export default function CatchAll() {
  notFound();
}
