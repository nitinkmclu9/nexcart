@echo off
echo ========================================
echo NEXCART - AUTOMATED GITHUB PUSH
echo ========================================
echo.

REM Set Git path
set GIT_PATH=C:\Program Files\Git\cmd
set PATH=%GIT_PATH%;%PATH%

echo Configuring Git...
git config --global user.name "NexCart Developer"
git config --global user.email "nexcart@example.com"
echo [OK] Git configured
echo.

cd /d "C:\Users\nitin\OneDrive\E comerse website\nexcart"

echo Initializing Git repository...
if not exist ".git" (
    git init
    echo [OK] Git initialized
) else (
    echo [OK] Git already initialized
)
echo.

echo Adding all files...
git add .
echo [OK] Files added
echo.

echo Creating commit...
git commit -m "Initial commit - NexCart E-Commerce Platform"
echo [OK] Commit created
echo.

echo ========================================
echo SUCCESS! Git repository created locally
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Create GitHub repository:
echo    - Go to: https://github.com/new
echo    - Name: nexcart
echo    - DO NOT initialize with README
echo    - Click "Create repository"
echo.
echo 2. Then run these commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/nexcart.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. When prompted for password, use your GitHub TOKEN
echo.
echo ========================================
echo.
pause
