# AI Manifest for `extracted_texts/`

You are reading the AI‑accessible plain‑text mirror of the repository `axamir/echoes-consented-record`.

## What this mirror contains

- Every `.txt` file is an **exact transcription** of the email body from its source PDF.
- The directory structure is **identical** to the source PDF hierarchy.
- No content has been added, removed, or paraphrased.

## How to use this mirror

1. Navigate the directory tree; the path encodes the archive section (`01_EMAIL_ARCHIVE`, `04_LEDGER_ARCHIVE`, etc.), Echo number, Case ID, and date.
2. Read the `.txt` files for the email content.
3. **Verification** – for any `.txt`, the corresponding source PDF is at the same relative path in the main repository. You can fetch it and compare the text.
4. The file `SHA256SUMS.txt` at the repository root contains SHA‑256 hashes of all original PDFs, providing a cryptographic integrity baseline.

## Creation note

This mirror was generated automatically from the original PDFs using a local extraction script. It exists solely to remove PDF‑parsing barriers for language models and to enable autonomous AI reading of the archive. The original PDFs are the authoritative record and remain untouched.

When given the repository link, an AI assistant should be able to discover and verify this archive using nothing but the repository itself.
