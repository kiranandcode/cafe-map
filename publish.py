#!/usr/bin/env python3
import shutil
from pathlib import Path

root = Path("build/_app/immutable")
assets_dir = root / "assets"

css_files = sorted(assets_dir.glob("*.css"))
js_files = sorted(root.glob("*.js"))

if not css_files:
    raise FileNotFoundError("No CSS files found in build/_app/immutable/assets/")
if not js_files:
    raise FileNotFoundError("No JS files found in build/_app/immutable/")

css_target = Path("dist/cafehopper.css")
js_target = Path("dist/cafehopper.js")

print(f"Copying {css_files[0]} → {css_target}")
shutil.copy2(css_files[0], css_target)

print(f"Copying {js_files[0]} → {js_target}")
shutil.copy2(js_files[0], js_target)
