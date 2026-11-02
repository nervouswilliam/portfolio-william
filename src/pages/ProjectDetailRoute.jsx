import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProjectDetailComponent from "../components/ProjectDetailComponent";
import SEO from "../components/SEO";
import { useLocalizedItems } from "../content/useContent";

// Resolves a project's details page by slug, from the database or the built-in
// content. Used by both the original URLs (/hdb_project, ...) and /projects/:slug.
export default function ProjectDetailRoute({ slug: fixedSlug }) {
  const params = useParams();
  const slug = fixedSlug ?? params.slug;
  const { t } = useTranslation();
  const { items, loading } = useLocalizedItems("project");
  const item = items.find((i) => i.slug === slug);

  if (item?.fields.detail) {
    // Projects that already had a URL keep it as their canonical address.
    const canonicalPath = item.fields.route ? `/${item.fields.route}` : `/projects/${item.slug}`;
    return <ProjectDetailComponent data={item.fields.detail} ogImage={item.fields.image} canonicalPath={canonicalPath} />;
  }
  if (loading && !item) return null; // still waiting for the database

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 12 }}>
      <SEO title="Page not found" path={`/projects/${slug ?? ""}`} />
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {t("notFound.title")}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {t("notFound.body")}
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          {t("notFound.back")}
        </Button>
      </Container>
    </Box>
  );
}
