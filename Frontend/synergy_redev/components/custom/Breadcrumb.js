import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHome,
  faSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { toTitle } from "../utility";

const _defaultGetTextGenerator = (param, query) => null;
const _defaultGetDefaultTextGenerator = (path) => toTitle(path);
const generatePathParts = (pathStr) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

function Crumb({
  text: defaultText,
  textGenerator,
  href,
  icon,
  query,
  last = false,
}) {
  // All crumbs will be rendered as links that can be visited
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!Boolean(textGenerator)) {
      return;
    }
    // Run the text generator and set the text again
    textGenerator().then((e) => {
      setText(e);
    });
  }, [textGenerator]);
  return (
    <span
      className={
        "flex gap-2 text-xs  text-opacity-50 hover:text-opacity-100 text-primary-500 dark:text-primary-300 items-center"
      }
    >
      <Link
        underline="hover"
        color="inherit"
        href={{
          pathname: href,
          query,
        }}
        as={href}
        className={`transition-all ${last ? "font-bold text-opacity-100" : "decoration-0 hover:decoration-1 hover:underline hover:underline-offset-2"}`}
      >
        {icon ? (
          <FontAwesomeIcon icon={icon} className={"size-3"} />
        ) : (
          text.replace("%20", " ")
        )}
      </Link>
      {last ? null : (
        <FontAwesomeIcon icon={faChevronRight} className={"size-3"} />
      )}
    </span>
  );
}

export default function Breadcrumb({
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}) {
  const router = useRouter();
  const breadcrumbs = useMemo(() => {
    const asPathNestedRoutes = generatePathParts(router.asPath);
    const pathnameNestedRoutes = generatePathParts(router.pathname);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");

      const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");
      // The title will just be the route string for now
      const text = subpath;
      return {
        href,
        query: router.query,
        textGenerator: getTextGenerator(param, router.query),
        text: getDefaultTextGenerator(subpath, href),
      };
    });

    // Add in a default "Home" crumb for the top-level

    return [{ href: "/", text: "/", icon: faHome }, ...crumblist];
  }, [
    router.asPath,
    router.pathname,
    router.query,
    getTextGenerator,
    getDefaultTextGenerator,
  ]);
  useEffect(() => {
    // Remove any query parameters, as those aren't included in breadcrumbs
  }, []);
  return (
    <nav className="flex p-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {breadcrumbs.map((crumb, idx) => {
          return (
            <li>
              <Crumb
                {...crumb}
                key={idx}
                last={idx === breadcrumbs.length - 1}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
