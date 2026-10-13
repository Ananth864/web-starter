import { notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { RootProvider } from "fumadocs-ui/provider/tanstack";

import { mdxComponents } from "./mdx";
import { source } from "../lib/docs";

export function DocsContent({ slugs }: { slugs: string[] }) {
  const page = source.getPage(slugs);
  if (!page) throw notFound();
  const MDX = page.data.body;

  return (
    <RootProvider theme={{ enabled: false }}>
      <DocsLayout
        tree={source.getPageTree()}
        nav={{ title: "Documentation", url: "/docs" }}
        themeSwitch={{ enabled: false }}
        sidebar={{ collapsible: false }}
      >
        <DocsPage toc={page.data.toc} breadcrumb={{ enabled: false }}>
          <DocsTitle>{page.data.title}</DocsTitle>
          {page.data.description ? (
            <DocsDescription>{page.data.description}</DocsDescription>
          ) : null}
          <DocsBody>
            <MDX components={mdxComponents} />
          </DocsBody>
        </DocsPage>
      </DocsLayout>
    </RootProvider>
  );
}
