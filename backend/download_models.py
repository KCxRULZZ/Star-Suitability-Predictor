import shutil
import zipfile
from pathlib import Path
import gdown

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"
TMP_DIR = BASE_DIR / "tmp_download"

FILE_ID = "1GKZLGsWUG0d-VtnMgYJY-XzbEX99RCX3"
ZIP_PATH = TMP_DIR / "model.zip"


def clean_tmp():
    if TMP_DIR.exists():
        shutil.rmtree(TMP_DIR)
    TMP_DIR.mkdir(parents=True, exist_ok=True)


def main():
    print("Preparing model download...")
    clean_tmp()

    url = f"https://drive.google.com/uc?id={FILE_ID}"
    print("Downloading model.zip from Google Drive...")
    gdown.download(url, str(ZIP_PATH), quiet=False, fuzzy=True)

    extract_dir = TMP_DIR / "extracted"
    extract_dir.mkdir(parents=True, exist_ok=True)

    print("Extracting model.zip...")
    with zipfile.ZipFile(ZIP_PATH, "r") as zf:
        zf.extractall(extract_dir)

    inner_model = extract_dir / "model"

    if MODEL_DIR.exists():
        shutil.rmtree(MODEL_DIR)

    shutil.move(inner_model, MODEL_DIR)

    print("Models downloaded and placed correctly.")


if __name__ == "__main__":
    main()