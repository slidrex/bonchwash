import os


def get_db_path():
    # Assuming the same relative path logic
    base_dir = os.path.dirname(__file__)  # Get the current file's directory
    return os.path.join(base_dir, "..", "..", "laundry.db")
