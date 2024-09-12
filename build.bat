@echo off
rmdir out /s /q
echo Building...
tsc && (
    echo Compressing...
    powershell Compress-Archive -Path out -DestinationPath out.zip
    echo Done.
)