@echo off
echo ========================================
echo NEXCART BACKEND - PREPARING FOR RENDER
echo ========================================
echo.

echo Step 1: Checking backend folder...
if exist "backend\package.json" (
    echo [OK] Backend folder found
) else (
    echo [ERROR] Backend folder not found!
    pause
    exit /b 1
)

echo.
echo Step 2: Creating ZIP file for Render...
powershell -command "Compress-Archive -Path 'backend' -DestinationPath 'backend-for-render.zip' -Force"

if exist "backend-for-render.zip" (
    echo [OK] ZIP file created successfully!
    echo.
    echo ZIP file location: %CD%\backend-for-render.zip
) else (
    echo [ERROR] Failed to create ZIP file
    pause
    exit /b 1
)

echo.
echo ========================================
echo PREPARATION COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to https://render.com
echo 2. Sign up/Login
echo 3. Click New+ - Web Service
echo 4. Upload: backend-for-render.zip
echo 5. Settings:
echo    - Build: npm install ^&^& npm run build
echo    - Start: node dist/server.js
echo 6. Add environment variables (see guide)
echo.
echo Check COMPLETE-DEPLOYMENT-GUIDE.md for detailed steps!
echo.
pause
