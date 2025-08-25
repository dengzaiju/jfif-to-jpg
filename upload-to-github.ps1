# JFIF转JPG工具站 - GitHub上传脚本 (PowerShell版本)
Write-Host "========================================" -ForegroundColor Green
Write-Host "JFIF转JPG工具站 - GitHub上传脚本" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# 检查Git状态
Write-Host "正在检查Git状态..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "正在添加文件到暂存区..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "正在提交更改..." -ForegroundColor Yellow
$commitMessage = "初始化项目：JFIF转JPG工具站 - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage

Write-Host ""
Write-Host "正在推送到GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "上传完成！" -ForegroundColor Green
Write-Host "请访问: https://github.com/dengzaiju/jfif-to-jpg" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green

Read-Host "按回车键退出" 