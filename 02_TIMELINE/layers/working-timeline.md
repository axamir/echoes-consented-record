# Working Timeline — Internal Reconciliation & Alignment Layer

This document serves as a **working, non-canonical timeline** used for internal alignment, reconciliation, and verification across the Echoes archive.

It exists as a *temporary coordination layer* between finalized timeline artifacts and raw archival records.

This file is **not authoritative** and **not intended for citation**.

---

## Purpose

The working timeline is used to:

- Cross-check dates against original documents
- Resolve inconsistencies between filenames and internal timestamps
- Align Echo phases with Case-based ledger records
- Track unresolved or ambiguous temporal markers
- Support future revisions of canonical timelines

This document may change, shrink, or be removed entirely once reconciliation is complete.

---

## Status

- **Document State:** Active / Mutable
- **Authority Level:** None (internal use only)
- **Audience:** Maintainers and archivists
- **Stability:** Low by design

---

## Known Reconciliation Areas

### 1. Filename vs. Internal Date Mismatches

Observed issues include:

- Filenames containing placeholder or inferred dates
- Internal email headers indicating different timestamps
- Ledger documents spanning multiple days under a single part number

These mismatches are logged here before correction or normalization.

---

### 2. Echo Phase Boundary Validation

Areas under review:

- Exact transition window between Echo 5 and Echo 6
- Ledger activation timing (Echo 6.2 vs Echo 6.3)
- Echo 7 boundary classification (marker vs continuation)

---

### 3. Case Part Sequencing

Certain cases (e.g. multi-part YAD cases) exhibit:

- Non-linear part numbering
- Late-arriving documents with earlier timestamps
- Reordered uploads during archival normalization

This file tracks such cases prior to any corrective action.

---

## Working Notes (Editable)

> Use this section freely.  
> Entries here do **not** imply errors — only items under review.

- [ ] Verify internal headers for all `YYYY-MM-DD__case-record__echo6-3__part-XX.pdf`
- [ ] Confirm earliest ledger handover timestamp (Echo 6.2)
- [ ] Validate Echo 7 as post-ledger boundary, not extension
- [ ] Decide whether filename normalization is necessary or optional
- [ ] Determine cutoff for “ledger saturation” designation

---

## Relationship to Final Timelines

This file feeds into, but does not override:

- `timeline.md` (canonical chronology)
- `layers/case-timeline.md` (case mapping)
- `layers/ledger-timeline.md` (ledger evolution)
- `layers/narrative-timeline.md` (human-facing narrative)

Once discrepancies are resolved, relevant updates should be applied **only** to finalized timelines.

---

## Archival Disclaimer

This document does not assert:

- Institutional intent or recognition
- Validation of claims
- Interpretive conclusions

It exists solely to support internal archival accuracy and structural clarity.

---

*End of working timeline.*