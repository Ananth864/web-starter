import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsContent } from "../components/docs-page";
import { source } from "../lib/docs";

export const Route = createFileRoute("/docs/$")({
  loader: ({ params }) => {
    const slugs = params._splat?.split("/").filter(Boolean) ?? [];
    const page = source.getPage(slugs);
    if (!page) throw notFound();
    return { slugs, title: page.data.title, description: page.data.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Documentation"} | Web Starter` },
      ...(loaderData?.description
        ? [{ name: "description", content: loaderData.description }]
        : []),
    ],
  }),
  component: Documentation,
});

function Documentation() {
  const { slugs } = Route.useLoaderData();
  return <DocsContent slugs={slugs} />;
}
