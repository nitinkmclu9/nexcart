@echo off
echo ========================================
echo NEXCART - PUSH TO GITHUB
echo ========================================
echo.

cd /d "C:\Users\nitin\OneDrive\E comerse website\nexcart"

echo Step 1: Initializing Git repository...
if not exist ".git" (
    git init
    echo [OK] Git initialized
) else (
    echo [OK] Git already initialized
)

echo.
echo Step 2: Adding all files...
git add .
echo [OK] Files added

echo.
echo Step 3: Creating commit...
git commit -m "Initial commit - NexCart E-Commerce Platform"
echo [OK] Commit created

echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1. Create GitHub repository at: https://github.com/new
echo    - Name: nexcart
echo    - DO NOT initialize with README
echo.
echo 2. Replace YOUR_USERNAME below with your GitHub username:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/nexcart.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. When prompted for password, use your GitHub TOKEN (not password)
echo.
pause
