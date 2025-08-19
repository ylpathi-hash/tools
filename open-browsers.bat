@echo off
echo Opening Multi-Tools Website in multiple browsers...
echo.

echo Opening in Chrome...
start chrome http://localhost:8000

echo Opening in Edge...
start msedge http://localhost:8000

echo Opening in Firefox...
start firefox http://localhost:8000

echo.
echo Website should now be open in all browsers!
echo Local server URL: http://localhost:8000
echo.
pause 