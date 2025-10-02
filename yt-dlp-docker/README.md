# yt-dlp + Tor Docker Container

This Docker container allows you to download YouTube videos using `yt-dlp` over Tor, with `tmux` for managing multiple processes (Tor + yt-dlp) simultaneously.
It mounts a host folder (`/shared`) to store downloads.

---

## Complete Instructions (all commands inside code blocks)

```bash
# 1. First-time setup (build and run container)
docker-compose build --no-cache ytdlp
docker-compose run --rm ytdlp

# 2. Start the container once it is already built (reuse image without rebuilding)
docker-compose run --rm ytdlp

# 3. Start Tor inside the container
tor &

# 4. Start tmux to manage Tor and yt-dlp
tmux
# Split window inside tmux: Ctrl+b then %
# Run tor in one pane
# Run yt-dlp in another pane

# 5. Run yt-dlp through Tor

# Minimal command to download a single video file (best pre-merged format, no warning)
yt-dlp --proxy "socks5h://127.0.0.1:9050" -f b "[VIDEO_URL]"

# Alternative commands:

# Download best video + audio merged into one file (requires ffmpeg)
yt-dlp --proxy "socks5h://127.0.0.1:9050" -f "bestvideo+bestaudio" -o "%(title)s.%(ext)s" "[VIDEO_URL]"

# Download audio only
yt-dlp --proxy "socks5h://127.0.0.1:9050" -f "bestaudio" -o "%(title)s.%(ext)s" "[VIDEO_URL]"

# 6. Check downloaded files in shared folder
ls /shared

# 7. Update yt-dlp to the latest version
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
chmod +x /usr/local/bin/yt-dlp
yt-dlp --version

# 8. Exiting
# Detach from tmux: Ctrl+b then d
# Exit container shell: exit
```
