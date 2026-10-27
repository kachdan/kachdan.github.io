"""Fail if the public resume contains a phone number anywhere.

Checks the visible text of every page, the document info (title, author,
subject, keywords, creator, producer) and the XMP metadata packet.
Run: python3 scripts/check_resume.py public/Dan_Kachula_Resume.pdf
"""
import re
import sys

from pypdf import PdfReader

# US style numbers like 704 555 1234, (704) 555-1234, 704.555.1234, +1 704 555 1234
PHONE = re.compile(r"(?:\+?1[\s.\-]*)?\(?\b\d{3}\)?[\s.\-]*\d{3}[\s.\-]*\d{4}\b")


def main(path: str) -> int:
    reader = PdfReader(path)
    places = {}
    for i, page in enumerate(reader.pages, 1):
        places[f"page {i} text"] = page.extract_text() or ""
    for key, value in (reader.metadata or {}).items():
        places[f"info {key}"] = str(value)
    try:
        xmp = reader.trailer["/Root"].get("/Metadata")
        if xmp is not None:
            places["xmp"] = xmp.get_object().get_data().decode("utf-8", "ignore")
    except Exception:
        pass

    hits = [(where, m.group(0)) for where, text in places.items() for m in PHONE.finditer(text)]
    print(f"Checked {len(reader.pages)} page(s) and {len(places) - len(reader.pages)} metadata field(s).")
    if hits:
        for where, found in hits:
            print(f"PHONE NUMBER FOUND in {where}: {found}")
        return 1
    print("No phone number found.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "public/Dan_Kachula_Resume.pdf"))
