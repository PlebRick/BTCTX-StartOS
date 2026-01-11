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
├── manifest.ts          # Package metadata, version, Docker image reference
├── sdk.ts               # SDK initialization
├── store.ts             # Persistent store type (currently empty)
├── utils.ts             # Shared utilities
└── procedures/
    ├── index.ts         # Main exports
    ├── main.ts          # Daemon setup (uvicorn command, env vars)
    ├── init.ts          # Initialization plumbing
    ├── interfaces.ts    # Network interface setup (port 80)
    ├── backups.ts       # Backup configuration
    ├── actions/         # User-facing actions
    │   ├── index.ts
    │   ├── showDefaultCredentials.ts
    │   └── resetCredentials.ts
    ├── dependencies/    # Service dependencies (none)
    └── versions/        # Version migration files
        ├── index.ts     # Version graph
        └── v*.ts        # Individual version migrations
```

## Key Configuration

- **Docker image:** `b1ackswan/btctx:latest` (pulled from Docker Hub)
- **Architecture:** aarch64, x86_64
- **Port:** 80 (HTTP)
- **Database path:** `/data/btctx.db`
- **Volume mount:** `/data`
- **Start command:** `uvicorn backend.main:app --host 0.0.0.0 --port 80`
- **Default credentials:** admin / password

## Common Workflows

### "Docker image updated"

When the user indicates the upstream Docker image has been updated, this typically means:
1. Bump the wrapper version to match the upstream release
2. Update release notes in the manifest
3. Create a new version migration file
4. Build and package the new .s9pk

Follow the version bumping checklist below.

## Version Bumping Checklist

When updating for a new upstream release:

1. Update `version` in `startos/manifest.ts`
2. Update `canMigrateTo` in manifest if needed
3. Update `releaseNotes` in manifest
4. Create new version file in `startos/procedures/versions/v*_*_*_*.ts`
5. Update `startos/procedures/versions/index.ts` to set new version as current
6. Run `npm run check` to verify TypeScript
7. Build with `make`

## Database Path

The upstream app uses `/data/btctx.db`. This is configured in:
- `startos/procedures/main.ts` (DATABASE_FILE env var)
- `startos/procedures/actions/resetCredentials.ts` (sqlite3 connection)
