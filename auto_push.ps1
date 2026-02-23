Write-Host "Auto-push started. Monitoring for changes..."
while($true) {
    try {
        $status = git status --porcelain
        if ($status) {
            $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            Write-Host "Changes detected at $date. Committing and pushing..."
            git add .
            git commit -m "chore: auto-sync $date"
            git push
            Write-Host "Push complete."
        }
    } catch {
        Write-Host "Error occurred during git push: $_"
    }
    Start-Sleep -Seconds 60
}
