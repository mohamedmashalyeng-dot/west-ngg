"""Add or replace a photo used by the site.

Writes WebP copies at the given widths into src/assets/img/photos/ and records
the image in src/assets/img/manifest.json so templates can use it by name.

Usage (requires Pillow: python -m pip install pillow):
    python scripts/optimize_image.py path/to/photo.jpg my-photo-name 1600 800
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / 'src' / 'assets' / 'img'


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    source, name = Path(sys.argv[1]), sys.argv[2]
    widths = [int(w) for w in sys.argv[3:]] or [1600, 800]
    im = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    files = {}
    for w in widths:
        copy = im.copy()
        if copy.width > w:
            copy = copy.resize((w, round(copy.height * w / copy.width)), Image.LANCZOS)
        filename = f'{name}-{copy.width}.webp'
        copy.save(IMG / 'photos' / filename, 'WEBP', quality=78, method=6)
        files[str(copy.width)] = filename
    manifest_path = IMG / 'manifest.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    manifest[name] = {'w': im.width, 'h': im.height, 'files': files}
    manifest_path.write_text(json.dumps(manifest, indent=1), encoding='utf-8')
    print(f'Added "{name}": {", ".join(files.values())}')


if __name__ == '__main__':
    main()
