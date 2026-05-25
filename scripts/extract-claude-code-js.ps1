param(
  [string]$Version = "latest",
  [string]$Package = "@anthropic-ai/claude-code-linux-x64",
  [string]$OutDir = ".\artifacts"
)

$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$resolvedVersion = if ($Version -eq "latest") {
  npm view $Package version
} else {
  $Version
}

Write-Host "Packing $Package@$resolvedVersion"
$tgzName = npm pack "$Package@$resolvedVersion" --pack-destination $OutDir
$tgzPath = Join-Path $OutDir $tgzName

$unpackDir = Join-Path $OutDir "unpacked-$resolvedVersion"
if (Test-Path $unpackDir) {
  Remove-Item -LiteralPath $unpackDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $unpackDir | Out-Null
tar -xzf $tgzPath -C $unpackDir

$binaryPath = Join-Path $unpackDir "package\claude"
if (!(Test-Path $binaryPath)) {
  throw "Expected native binary at $binaryPath"
}

$jsPath = Join-Path $OutDir "claude-code-$resolvedVersion.js"
Write-Host "Extracting embedded JavaScript to $jsPath"
npx --yes tweakcc@latest unpack $jsPath $binaryPath

Write-Host "Done"
Write-Host "Binary: $binaryPath"
Write-Host "JS:     $jsPath"
