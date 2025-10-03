FROM alpine:latest

# Install Python (needed for yt-dlp binary), ffmpeg, tor, curl, tmux
RUN apk add --no-cache python3 ffmpeg tor curl ca-certificates btop htop tmux

# Download yt-dlp binary (prebuilt, avoids pip issues)
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp && \
    chmod +x /usr/local/bin/yt-dlp

WORKDIR /shared

# Expose Tor SOCKS proxy port
EXPOSE 9050

# Default to shell
CMD ["sh"]
