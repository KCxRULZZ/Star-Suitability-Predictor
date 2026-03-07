import shutil
import zipfile
from pathlib import Path
import gdown

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"
TMP_DIR = BASE_DIR / "tmp_download"

# Replace this with your real Google Drive FILE ID
FILE_ID = "1GKZLGsWUG0d-VtnMgYJY-XzbEX99RCX3"

ZIP_PATH = TMP_DIR / "model.zip"


def models_exist():
    return False


def clean_tmp():
    if TMP_DIR.exists():
        shutil.rmtree(TMP_DIR)
    TMP_DIR.mkdir(parents=True, exist_ok=True)


def extract_zip(zip_file, destination):
    if destination.exists():
        shutil.rmtree(destination)
    destination.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(zip_file, "r") as zf:
        zf.extractall(destination)


def main():
    print("Checking if models already exist...")

    if models_exist():
        print("Models already exist. Skipping download.")
        return

    clean_tmp()

    url = f"https://drive.google.com/uc?id={FILE_ID}"
    print("Downloading model.zip from Google Drive...")
    gdown.download(url, str(ZIP_PATH), quiet=False, fuzzy=True)

    if not ZIP_PATH.exists():
        raise FileNotFoundError("model.zip was not downloaded.")

    print("Extracting model.zip...")
    extract_zip(ZIP_PATH, MODEL_DIR)

    print("Models downloaded and extracted successfully.")


if __name__ == "__main__":
    main()