from hashlib import sha256


def hash_password(raw_password):
    string_bytes = bytes(raw_password, "utf-8")
    hashed_string = sha256(string_bytes)
    return hashed_string.hexdigest()


def validate_hash(raw_password, hash):
    string_bytes = bytes(raw_password, "utf-8")
    hashed_string = sha256(string_bytes)
    return hashed_string.hexdigest() == hash
