"""Rebuild the nonvisual motion-permission map; original artwork remains unchanged.
Requires Pillow. Coordinates are source pixels (top-left origin), independently
hand-traced to protect mountain/snow silhouettes. Output is runtime mask data.
"""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFilter, ImageChops
root=Path(__file__).resolve().parents[1]
polygons=json.loads((root/'tests/nessun-cloud-mask.json').read_text())
raw=Image.new('L',(1024,1024));draw=ImageDraw.Draw(raw)
draw.polygon([tuple(p) for p in polygons['cloud_domain']],fill=255)
for name,points in polygons.items():
    if name!='cloud_domain': draw.polygon([tuple(p) for p in points],fill=0)
# Feather inward and clamp to the authored domain: no activation on rigid terrain.
mask=ImageChops.darker(raw,raw.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.GaussianBlur(5)))
mask.save(root/'assets/realism/cloudsea-motion-mask.png')
