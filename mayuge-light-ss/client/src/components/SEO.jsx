import { Helmet } from "react-helmet-async";
import { SCHOOL } from "../data/school.js";

/**
 * Reusable SEO meta wrapper. Each page provides its own title + description.
 */
export default function SEO({ title, description, image }) {
  const fullTitle = title
    ? `${title} | ${SCHOOL.shortName}`
    : `${SCHOOL.name} | Excellence in Education`;
  const desc = description || SCHOOL.tagline;
  const img = image || "/images/campus/campus-1.jpg";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
