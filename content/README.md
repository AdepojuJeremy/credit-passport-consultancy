# Content

The `content/` directory remains the editorial staging area for future MDX publishing.

The current public research notes and engagement patterns are rendered from typed data modules in `data/` so the first content pass can ship without adding a CMS or markdown runtime dependency.

## Current sources

- Research notes: `data/research-posts.ts`
- Engagement patterns: `data/engagement-patterns.ts`
- Consulting capabilities: `data/services.ts`

## Future MDX migration

The templates under `content/research/` and `content/case-studies/` define the intended editorial structure. When publishing volume justifies a full MDX pipeline, migrate reviewed content into those files while preserving slugs and page routes.

## Evidence rules

See `docs/content-source-policy.md` before publishing client names, numerical results, market claims or causal findings.
