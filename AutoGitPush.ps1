$repoPath = "C:\Users\FredrikBeckman\OneDrive - Skyddsprodukter i Sverige AB\Tor Finans\Skyddsprodukter\Antigravity projects\Beredskapsplan"
Set-Location -Path $repoPath

$status = git status --porcelain
if ($status) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git add .
    git commit -m "Auto-commit: $date"
    git push
}
