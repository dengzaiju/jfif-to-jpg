@echo off
echo ========================================
echo JFIF转JPG工具站 - GitHub上传脚本
echo ========================================
echo.

echo 正在检查Git状态...
git status

echo.
echo 正在添加文件到暂存区...
git add .

echo.
echo 正在提交更改...
git commit -m "初始化项目：JFIF转JPG工具站 - %date% %time%"

echo.
echo 正在推送到GitHub...
git push -u origin main

echo.
echo ========================================
echo 上传完成！
echo 请访问: https://github.com/dengzaiju/jfif-to-jpg
echo ========================================
pause 