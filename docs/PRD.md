# PRD: BTCTX-StartOS Wrapper Hardening & Modernization

**Status:** Approved scope, in progress
**Target version:** `0.6.0:1-beta` (wrapper-only changes; upstream app unchanged)
**Baseline:** `0.6.0:0-beta` on start-sdk 1.5.3 / start-cli 0.4.0-beta.9

## Background

This repo packages BitcoinTX (upstream Docker image `b1ackswan/btctx`) as an
`.s9pk` for StartOS 0.4.x. The wrapper was recently migrated to the stable
start-sdk 1.5.3 and ships releases via CI. This PRD covers the remaining work
to bring it to the quality bar of first-party Start9 packages.

## Goals

1. Reproducible, verifiable builds — the s9pk provably contains the app
   version its manifest declares.
2. Honest health reporting — "Running" in the StartOS UI means the app
   actually serves HTTP.
3. No shared default credentials — each install gets a unique admin password.
4. Continuous verification — every push is type-checked and built by CI.
5. Maintainer automation — get notified when upstream publishes a new release.
6. Structural parity with current Start9 reference wrappers (vaultwarden-startos).

## Non-goals

- Changes to the upstream BitcoinTX application itself.
- Marketplace/registry submission (separate effort once this lands).
- Full translation coverage — we adopt the i18n-compatible structure but ship
  English strings only.

## Workstreams

### WS1 — Reproducible builds: pin the Docker image

- `startos/manifest.ts`: `dockerTag: 'b1ackswan/btctx:latest'` →
  `'b1ackswan/btctx:v0.6.0'` (upstream publishes version tags).
- `.github/workflows/release.yml`: pull the tag parsed from the manifest
  instead of hardcoded `latest`, so the workflow can never drift from the
  manifest.
- `CLAUDE.md` / `README.md`: the "must docker pull latest first" warnings
  become "bump the pinned tag in the manifest" — update the version checklist.

**Acceptance:** re-running the release workflow for a given commit always
packs the same app version; no step depends on the mutable `latest` tag.

### WS2 — Real HTTP health check

- `startos/main.ts`: replace `checkPortListening` with
  `sdk.healthCheck.checkWebUrl` against the web UI, mirroring the pattern used
  by vaultwarden-startos.

**Acceptance:** health check fails if uvicorn binds the port but the app
errors; passes when HTTP responses are served.
**Risk:** cannot be runtime-tested in this environment (no StartOS box);
mitigated by copying the reference wrapper's exact pattern.

### WS3 — CI on every push/PR

- New `.github/workflows/ci.yml`: `npm ci`, `prettier --check`, `tsc --noEmit`,
  `ncc build` on pushes and PRs to master.

**Acceptance:** SDK/type breakage is caught on push, not at release time.

### WS4 — Unique admin password per install

- New file model (`startos/fileModels/wrapper-store.json.ts`): a JSON file on
  the `main` volume holding wrapper-managed secrets (generated password).
- New init script (`startos/init/firstBoot.ts`, runs after `versions` in
  `setupInit`): on fresh install only, generate a random password
  (`getDefaultString`, 22 chars alphanumeric), bcrypt-hash and write it to the
  users table via a temp subcontainer (same mechanism as the existing reset
  action), and persist it to the file model.
- `showDefaultCredentials` → `showCredentials`: reads the stored password;
  falls back to the documented defaults for installs that predate this feature.
- `resetCredentials`: generates a fresh random password (no longer resets to
  `admin`/`password`) and updates the file model; restricted to
  `allowedStatuses: 'only-stopped'` to avoid writing the SQLite file while
  uvicorn has it open (also resolves WS5).
- `instructions.md` + manifest install alert: point users at the
  "Show Credentials" action instead of printing `admin`/`password`.

**Edge cases:**
- Update from `<=0.6.0:0-beta`: existing user credentials are untouched; the
  credentials action falls back to default-credentials messaging if no stored
  secret exists.
- Restore from backup: the file model lives on the backed-up volume, so the
  stored password travels with the database it matches.

**Acceptance:** fresh installs are not reachable with `admin`/`password`;
updates and restores preserve existing logins.

### WS5 — Reset action robustness

Folded into WS4 (`only-stopped` + random regeneration).

### WS6 — Upstream release watcher

- New `.github/workflows/upstream-check.yml`: daily cron; queries the Docker
  Hub tags API for `b1ackswan/btctx`, compares the newest `vX.Y.Z` tag against
  the version pinned in the manifest, and opens (or updates) a tracking issue
  when they differ. No auto-bump — a human stays in the loop.

**Acceptance:** a new upstream tag results in exactly one open issue within
24h; no duplicate issues on subsequent runs.

### WS7 — Structural modernization

Match the current Start9 template layout (procedures flattened into
`startos/`):

```
startos/
├── actions/         (showCredentials, resetCredentials, index)
├── fileModels/      (wrapper-store.json.ts)
├── init/            (firstBoot.ts, index exporting init/uninit)
├── manifest/        (index.ts — moved from startos/manifest.ts)
├── versions/        (unchanged content, moved up)
├── backups.ts  dependencies.ts  index.ts  interfaces.ts
├── main.ts  sdk.ts  utils.ts
```

- Delete empty `store.ts` (superseded by the file model).
- Update `package.json` build entry, CLAUDE.md project-structure section.
- All strings remain plain `LocaleString`-compatible English; structure leaves
  room for translations later.

**Acceptance:** `npm run check` and a full `make` s9pk build pass in the new
layout; the packed manifest is identical (modulo version) to the WS1-6 state.

### WS8 — Release

- New version file `0.6.0:1-beta` with release notes summarizing the above;
  migration is a no-op for data (password generation is install-time only,
  never on update).
- Build + inspect s9pk locally, run code review, push to the working branch.
- Merge to master and publish the release **only after maintainer sign-off**.

## Execution order

WS1 → WS2 → WS3 (small, current layout) → WS7 (restructure while the diff is
clean) → WS4/WS5 (new feature in the new layout) → WS6 → WS8.

## Risks

| Risk | Mitigation |
|------|------------|
| Health check / init API behavior differs on a real StartOS box | Follow vaultwarden-startos patterns exactly; both target the same SDK + OS version |
| Restructure breaks the build | Isolated commit; full `make` s9pk build verified before and after |
| StartOS 0.4 is still beta; APIs may drift | SDK and start-cli pinned in lockstep (1.5.3 / 0.4.0-beta.9); CI catches breakage on bump |
| SQLite locking during password writes | All writes happen when the daemon is not running (install-time init, only-stopped action) |
