import pdfplumber
import pathlib

pdf_dir = pathlib.Path(".")   # اگر PDFها زیرپوشه‌ان مسیر رو عوض کن
out_dir = pathlib.Path("extracted_texts")
out_dir.mkdir(exist_ok=True)

for pdf_path in pdf_dir.glob("*.pdf"):
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                full_text += page_text + "\n"
        txt_path = out_dir / (pdf_path.stem + ".txt")
        txt_path.write_text(full_text, encoding="utf-8")
        print(f"✅ {pdf_path.name} → {txt_path}")

print("\n🎉 تموم! متن‌ها توی پوشه‌ی extracted_texts/ آماده‌ست.")
