# Release a new version

1. `pnpm run lint`
1. `pnpm run toc`
1. `pnpm run setup`
1. Raise Version
1. `pnpm run build`
1. `pnpm run release` or with specific version `npx standard-version --release-as 3.0.0`
1. Login to NPM via `npm adduser` and `npm publish`
