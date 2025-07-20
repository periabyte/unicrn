# GitHub Workflows

This directory contains GitHub Actions workflows for the UNICRN CLI project.

## Workflows

### 1. CI (`ci.yml`)
- **Trigger**: Push to main branch, Pull Requests
- **Purpose**: Continuous Integration testing
- **Actions**:
  - Tests CLI functionality across Node.js versions 16, 18, 20
  - Verifies package structure
  - Runs security audit
  - Tests CLI commands in clean environment

### 2. Publish (`publish.yml`)
- **Trigger**: GitHub Release published
- **Purpose**: Automatically publish to NPM
- **Actions**:
  - Builds and verifies package
  - Publishes to NPM registry
  - Adds release comment

### 3. Release (`release.yml`)
- **Trigger**: Manual workflow dispatch
- **Purpose**: Create new releases with version bumping
- **Actions**:
  - Bumps version (patch/minor/major)
  - Creates GitHub release
  - Updates version in CLI

## Setup Required

### NPM Token
1. Create an NPM access token at https://www.npmjs.com/settings/tokens
2. Add it as a repository secret named `NPM_TOKEN`

### Usage

#### To create a new release:
1. Go to Actions tab in GitHub
2. Select "Release" workflow
3. Click "Run workflow"
4. Choose version bump type (patch/minor/major)
5. Workflow will create release and trigger NPM publish

#### Automatic NPM publish:
- Happens automatically when a GitHub release is published
- No manual intervention needed once NPM_TOKEN is configured
