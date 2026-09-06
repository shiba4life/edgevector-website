# EdgeVector Website

Public EdgeVector product website.

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Browser error reporting is enabled when `VITE_SENTRY_DSN` is present at build
time. Optional build variables:

```bash
VITE_SENTRY_ENVIRONMENT=production
VITE_SENTRY_RELEASE=edgevector-website@<git-sha>
```

`npm run build` copies workspace docs into `public/docs` when a sibling
workspace is present. In isolated CI clones it uses the committed `public/docs`
contents as-is.

## Source Of Truth

This repository is homed at `http://localhost:3300/EdgeVector/edgevector-website.git`. LastGit change
requests and `.lastgit/ci.sh` are the merge gate; GitHub is a read-only public
mirror for clone and browse workflows. Repo-local GitHub Actions are
intentionally inert.

Mirror sync is handled by `.lastgit/sync-github-mirror.sh`, optionally installed
as `com.edgevector.lastgit-mirror-edgevector-website` with
`.lastgit/install-mirror-launchd.sh`.
