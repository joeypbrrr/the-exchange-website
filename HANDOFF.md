# GitHub handoff

This workspace could not push to https://github.com/joeypbrrr/the-exchange-website.

`gh auth status` reports that the GitHub CLI is not logged in. `GH_TOKEN` and `GITHUB_TOKEN` are not set. Git credentials in this environment only rewrite `origin.cursor.com`. Do not reuse that token for GitHub.

## Publish

From a machine that is authenticated as a user who can push to `joeypbrrr/the-exchange-website`:

```bash
git clone https://github.com/joeypbrrr/the-exchange-website.git
# copy this project in, including docs/ and docs/.nojekyll
git add -A
git commit -m "Add The Exchange site and GitHub Pages export"
git push -u origin main
```

Then enable Pages from the `main` branch, folder `/docs`:

```bash
gh api --method POST -H "Accept: application/vnd.github+json" \
  /repos/joeypbrrr/the-exchange-website/pages \
  -f "source[branch]=main" \
  -f "source[path]=/docs"
```

The site URL is https://joeypbrrr.github.io/the-exchange-website/

`.nojekyll` is required so Pages serves the `/_next` folder.
