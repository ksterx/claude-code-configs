#!/usr/bin/env bash
set -euo pipefail

# Claude Code から JSON が stdin で渡ってくる（notification_type / message など）
input="$(cat)"
type="$(printf '%s' "$input" | jq -r '.notification_type // ""')"
msg="$(printf '%s' "$input" | jq -r '.message // "Claude Code: waiting for input"')"

# 「人間の入力待ち」だけ音を鳴らす
if [[ "$type" == "idle_prompt" ]]; then
  # 音（どれでもOK）
  afplay /System/Library/Sounds/Breeze.aiff >/dev/null 2>&1 || true

  # ついでに通知も（音付き）
  osascript -e "display notification \"${msg//\"/\\\"}\" with title \"Claude Code\" sound name \"Breeze\"" >/dev/null 2>&1 || true
fi
