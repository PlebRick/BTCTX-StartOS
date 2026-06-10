# CLAUDE.md

## Project Overview

StartOS wrapper for BitcoinTX, a self-hosted Bitcoin portfolio tracker with double-entry accounting and FIFO cost-basis tax reporting.

## Build Commands

```bash
# Build the s9pk package (requires start-cli)
export PATH="$HOME/.cargo/bin:$PATH" && make

# TypeScript type checking
npm run check

# Format code
npm run prettier

# Clean build artifacts
make clean
```

**Important:** `start-cli` is installed in `~/.cargo/bin/` which may not be in PATH by default. Always prepend the PATH when running make commands.

## Project Structure

```
startos/
├── index.ts             # Main exports (manifest built via buildManifest)
├── sdk.ts               # SDK initialization
├── main.ts              # Daemon setup (uvicorn command, env vars)
├── interfaces.ts        # Network interface setup (port 80)
├── backups.ts           # Backup configuration
├── dependencies.ts      # Service dependencies (none)
├── utils.ts             # Shared utilities
├── manifest/
│   └── index.ts         # Package metadata, Docker image reference
├── init/
│   └── index.ts         # Initialization plumbing
├── actions/             # User-facing actions
│   ├── index.ts
│   ├── showDefaultCredentials.ts
│   └── resetCredentials.ts
├── fileModels/          # Wrapper-managed files on the data volume
└── versions/            # Version migration files
    ├── index.ts         # Version graph
    └── v*.ts            # Individual version migrations
```

## Key Configuration

- **Docker image:** `b1ackswan/btctx:vX.Y.Z` (version tag pinned in `startos/manifest.ts`, pulled from Docker Hub)
- **Architecture:** aarch64, x86_64
- **Port:** 80 (HTTP)
- **Database path:** `/data/btctx.db`
- **Volume mount:** `/data`
- **Start command:** `uvicorn backend.main:app --host 0.0.0.0 --port 80`
- **Credentials:** username `admin`; a unique password is generated on install (stored in `/.startos-wrapper.json` on the `main` volume, retrievable via the Show Credentials action). Installs predating v0.6.0:1 may still use the upstream default `admin` / `password`.

## Common Workflows

### "Docker image updated"

When the user indicates the upstream Docker image has been updated, this typically means:
1. Update the pinned `dockerTag` in `startos/manifest.ts` to the new version tag (e.g. `b1ackswan/btctx:v0.7.0`)
2. Create a new version migration file with the bumped version and release notes
3. Set it as current in the versions index
4. Build and package the new .s9pk

**Important:** The image is pinned to a version tag in the manifest, so builds are reproducible. When building locally, pull the pinned tag first (e.g. `docker pull b1ackswan/btctx:v0.6.0`). The release CI workflow reads the pinned tag from the manifest automatically.

Follow the version bumping checklist below.

## Version Format

StartOS 0.4.0 uses Extended Version format: `upstream_version:wrapper_revision`

Example: `0.5.1:0`
- **`0.5.1`** - Upstream BTCTX app version
- **`:0`** - Wrapper revision (first packaging of this version)

**When to increment what:**
- Bump **upstream version** (`0.5.1` → `0.5.2`) when the Docker image/app changes
- Bump **wrapper revision** (`:0` → `:1`) when only wrapper code changes but upstream app is the same

**Important:** Always bump some part of the version for each release. Same-version sideloads trigger "reinstall" instead of "update", which may not preserve user data.

## Version Bumping Checklist

When updating for a new upstream release:

1. Update the pinned `dockerTag` in the manifest and pull it: `docker pull b1ackswan/btctx:vX.Y.Z`
2. Create new version file in `startos/versions/v*_*_*_*.ts` with the new `version` and `releaseNotes`
3. Update `startos/versions/index.ts` to set new version as current (previous current moves to `other`)
4. Run `npm run check` to verify TypeScript
5. Build with `make`

Note: Since start-sdk 1.x, the version, release notes, and migration ranges
(`canMigrateTo`/`canMigrateFrom`) are derived from the versions graph — they
no longer exist in `startos/manifest.ts`.

## Database Path

The upstream app uses `/data/btctx.db`. This is configured in:
- `startos/main.ts` (DATABASE_FILE env var)
- `startos/actions/resetCredentials.ts` (sqlite3 connection)

## Git Remotes & Releases

This repo is pushed to two remotes:
- **origin** → `https://github.com/PlebRick/BTCTX-StartOS.git`
- **org** → `https://github.com/BitcoinTX-org/BTCTX-StartOS.git`

When pushing changes or creating releases, always sync both:

```bash
# Push commits to both remotes
git push origin master
git push org master

# Push tags to both remotes
git push origin --tags
git push org --tags
```

When creating a GitHub release, create it on both repos with the same title, notes, and `btctx.s9pk` asset:

```bash
gh release create <tag> --repo PlebRick/BTCTX-StartOS --title "<title>" --notes "<notes>" ./btctx.s9pk
gh release create <tag> --repo BitcoinTX-org/BTCTX-StartOS --title "<title>" --notes "<notes>" ./btctx.s9pk
```

## Resources

- [StartOS 0.4.0 Packaging Guide](https://staging.docs.start9.com/packaging-guide/index.html) - Official documentation for building StartOS packages
- [Vaultwarden StartOS Wrapper](https://github.com/Start9Labs/vaultwarden-startos/tree/update/040) - Reference implementation (use `update/040` branch, not master)
