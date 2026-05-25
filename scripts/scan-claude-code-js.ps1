param(
  [Parameter(Mandatory = $true)]
  [string]$JsPath,
  [int]$ContextChars = 220
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $JsPath)) {
  throw "File not found: $JsPath"
}

$js = Get-Content -Raw -LiteralPath $JsPath
$patterns = @(
  "function nAA",
  "function n0A",
  "tengu_heron_brook",
  "Rv(`"heron_brook`"",
  "/api/claude_cli/bootstrap",
  "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC",
  "DISABLE_GROWTHBOOK",
  "GrowthBook"
)

foreach ($pattern in $patterns) {
  $idx = $js.IndexOf($pattern, [StringComparison]::Ordinal)
  if ($idx -lt 0) {
    Write-Host "MISS $pattern"
    continue
  }

  $start = [Math]::Max(0, $idx - $ContextChars)
  $length = [Math]::Min($js.Length - $start, $pattern.Length + (2 * $ContextChars))
  $snippet = $js.Substring($start, $length)
  $snippet = $snippet -replace "\s+", " "

  Write-Host ""
  Write-Host "HIT  $pattern"
  Write-Host "POS  $idx"
  Write-Host $snippet
}
