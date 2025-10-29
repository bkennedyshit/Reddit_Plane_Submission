import argparse
import logging
from pathlib import Path
from typing import Iterable

from PIL import Image
from rembg import remove


def process_images(input_dir: Path, output_dir: Path) -> None:
    """Remove background from all .png and .jpg images in input_dir."""
    if not input_dir.is_dir():
        raise NotADirectoryError(f"{input_dir} is not a valid directory")

    output_dir.mkdir(parents=True, exist_ok=True)
    images: Iterable[Path] = sorted(
        [p for p in input_dir.iterdir() if p.suffix.lower() in {'.png', '.jpg', '.jpeg'}]
    )

    if not images:
        logging.info("No images found in %s", input_dir)
        return

    for img_path in images:
        out_path = output_dir / f"{img_path.stem}.png"
        try:
            with Image.open(img_path) as img:
                img = img.convert("RGBA")
                result = remove(img, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=11)
                result.save(out_path)
                logging.info("Processed %s -> %s", img_path.name, out_path.name)
        except Exception as e:  # catch all errors including corrupt images
            logging.error("Failed to process %s: %s", img_path.name, e)


def main() -> None:
    parser = argparse.ArgumentParser(description="Remove backgrounds from images using rembg")
    parser.add_argument(
        "--input_dir",
        default="input",
        help="Directory containing source images (.png or .jpg)",
    )
    parser.add_argument(
        "--output_dir",
        default="output",
        help="Directory to save transparent .png images",
    )
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(message)s")

    process_images(Path(args.input_dir).resolve(), Path(args.output_dir).resolve())


if __name__ == "__main__":
    main()