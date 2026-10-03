param(
    [int]$Port = 8080
)

$root = "c:\Users\naiti\OneDrive\Desktop\Say Cofee"
$prefix = "http://localhost:$Port/"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Error ("Failed to start listener on " + $prefix + ": " + $_)
    exit 1
}

Write-Output "SAY COFFEE SERVER RUNNING at $prefix"
Write-Output "Root directory: $root"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl
        $path = $rawUrl.Split('?')[0]
        if ($path -eq '/' -or [string]::IsNullOrWhiteSpace($path)) {
            $path = '/index.html'
        }

        # Normalize relative path
        $relPath = $path.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path $root $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) {
                $contentType = "application/octet-stream"
            }

            $response.ContentType = $contentType
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.OutputStream.Close()
    } catch {
        # Catch individual request errors
    }
}
