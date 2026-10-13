import { createFileRoute } from "@tanstack/react-router";

import { DocsContent } from "../components/docs-page";
import { source } from "../lib/docs";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [{ title: `${source.getPage([])?.data.title ?? "Documentation"} | Web Starter` }],
  }),
  component: () => <DocsContent slugs={[]} />,
});
