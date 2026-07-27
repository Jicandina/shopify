$ErrorActionPreference = 'Stop'

$repoUrl = 'https://github.com/Jicandina/shopify.git'
$gh = 'C:\Program Files\GitHub CLI\gh.exe'
$projectPath = (Get-Location).Path

if (-not (Test-Path -LiteralPath $gh)) {
  throw 'GitHub CLI is not installed. Install it with: winget install GitHub.cli'
}

& $gh auth status | Out-Host
if ($LASTEXITCODE -ne 0) {
  Write-Host 'GitHub authentication is required. A browser window will open.' -ForegroundColor Yellow
  & $gh auth login -h github.com -p https -w
  if ($LASTEXITCODE -ne 0) { throw 'GitHub authentication did not complete.' }
}

git config --global --add safe.directory $projectPath

if (-not (Test-Path -LiteralPath '.git')) {
  git init -b main
}

$remoteNames = @(git remote)
if ($remoteNames -notcontains 'origin') {
  git remote add origin $repoUrl
} else {
  $origin = git remote get-url origin
  if ($origin -ne $repoUrl) {
  throw "This folder already points to a different remote: $origin"
  }
}

git add -- assets config layout locales sections templates .shopifyignore shopify-theme docs/storefront/auralis-shopify-theme.md README.md .gitignore publish-shopify-theme.ps1
git diff --cached --check
git commit -m 'Add Auralis Shopify theme'
git branch -M main
git push -u origin main

Write-Host 'Theme published to Jicandina/shopify.' -ForegroundColor Green
