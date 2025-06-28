# Prism Auto - PowerShell wrapper script for Windows

param(
    [Parameter(Position=0, Mandatory=$true)]
    [string]$Request,
    
    [switch]$AnalyzeOnly,
    [switch]$SkipTests,
    [switch]$SkipCommit,
    [switch]$SkipDeploy,
    [switch]$AutoConfirm,
    [switch]$Force,
    [switch]$Debug
)

# Colors for output
$Red = [System.ConsoleColor]::Red
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Blue = [System.ConsoleColor]::Blue
$Magenta = [System.ConsoleColor]::Magenta
$White = [System.ConsoleColor]::White

function Write-ColorOutput($ForegroundColor) {
    if ($_ -is [System.String]) {
        Write-Host $_ -ForegroundColor $ForegroundColor
    } else {
        $_ | Write-Host -ForegroundColor $ForegroundColor
    }
}

# Banner
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor $Magenta
Write-Host "║                         PRISM AUTO                           ║" -ForegroundColor $Magenta  
Write-Host "║            Development Automation for Prism Writing          ║" -ForegroundColor $Magenta
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor $Magenta

# Check if Python is available
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Python not found"
    }
    Write-Host "Found: $pythonVersion" -ForegroundColor $Blue
} catch {
    Write-Host "Error: Python 3 is required but not installed." -ForegroundColor $Red
    exit 1
}

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$AutomationDir = $ScriptDir

# Check if we're in the right directory
$PrismAutoComplete = Join-Path $AutomationDir "prism_auto_complete.py"
if (-not (Test-Path $PrismAutoComplete)) {
    Write-Host "Error: prism_auto_complete.py not found in $AutomationDir" -ForegroundColor $Red
    Write-Host "Make sure you're running this script from the automation directory."
    exit 1
}

# Check for virtual environment
$VenvPaths = @(
    (Join-Path $AutomationDir "venv\Scripts\activate.ps1"),
    (Join-Path $AutomationDir ".venv\Scripts\activate.ps1")
)

foreach ($VenvPath in $VenvPaths) {
    if (Test-Path $VenvPath) {
        Write-Host "Activating virtual environment..." -ForegroundColor $Blue
        & $VenvPath
        break
    }
}

# Install requirements if needed
$RequirementsFile = Join-Path $AutomationDir "requirements.txt"
if (Test-Path $RequirementsFile) {
    Write-Host "Checking dependencies..." -ForegroundColor $Blue
    pip install -q -r $RequirementsFile
}

# Build arguments
$Args = @()
$Args += "`"$Request`""

if ($AnalyzeOnly) { $Args += "--analyze-only" }
if ($SkipTests) { $Args += "--skip-tests" }
if ($SkipCommit) { $Args += "--skip-commit" }
if ($SkipDeploy) { $Args += "--skip-deploy" }
if ($AutoConfirm) { $Args += "--auto-confirm" }
if ($Force) { $Args += "--force" }
if ($Debug) { $Args += "--debug" }

# Run the automation
Write-Host "Starting Prism Auto..." -ForegroundColor $Green
Write-Host ""

Set-Location $AutomationDir
$Process = Start-Process -FilePath "python" -ArgumentList ("prism_auto_complete.py " + ($Args -join " ")) -Wait -PassThru -NoNewWindow

# Check exit code
if ($Process.ExitCode -eq 0) {
    Write-Host ""
    Write-Host "✅ Automation completed successfully!" -ForegroundColor $Green
} else {
    Write-Host ""
    Write-Host "❌ Automation failed. Check the logs above for details." -ForegroundColor $Red
    exit 1
}
