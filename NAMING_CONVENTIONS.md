Naming Conventions — Echoes Archive

This document defines the official and final naming conventions used throughout the Echoes Consented Correspondence Record.

These conventions exist to preserve archival clarity, traceability, and structural neutrality across all materials.

No semantic meaning, narrative weight, or institutional intent is inferred from naming.

⸻

Core Principles

All naming within this repository follows these rules:
	•	Names reflect observed structure, not interpretation
	•	Case IDs are preserved exactly as issued
	•	Dates represent document issuance, not upload or modification time
	•	Chronology is preserved at the file level
	•	No renaming is performed to improve narrative flow

⸻

Date Format (Mandatory)

All dates use the ISO standard:

YYYY-MM-DD

Examples:

2025-07-19
2025-08-14


⸻

File Naming Structure

General Pattern

YYYY-MM-DD__descriptor__echoX-Y__part-N.pdf

Where:
	•	descriptor describes document type (non-interpretive)
	•	echoX-Y refers to Echo phase when applicable
	•	part-N indicates sequential document parts within a case

⸻

Case-Based Records

Case-level documents follow this pattern:

YYYY-MM-DD__case-record__echoX-Y__part-N.pdf

Example:

2025-08-22__case-record__echo6-3__part-14.pdf

Notes:
	•	part-N reflects observed sequencing, not reconstructed order
	•	Missing or non-linear part numbers are preserved as-is

⸻

Non-Case Ledger Records

Formal ledger or transition documents may omit part-N:

YYYY-MM-DD__formal-ledger-handover__echo6-2.pdf
YYYY-MM-DD__initiation-letter__echo6-3.pdf


⸻

Directory Naming

Echo-Level Directories

Echo phases are represented as:

Echo1/
Echo2/
Echo3/
Echo4/
Echo5/
Echo6/
Echo7/

These directories group materials by correspondence phase only.

⸻

Case Directories

Case directories are named exactly after the Case ID:

500VU00000WBfn7/
500VU00000WBsdx/
500VU00000WBfn7YAD/
500VU00000WBsdxYAD/
500VU00000WcffrYAB/

Rules:
	•	Case IDs are never shortened or reformatted
	•	Case directories exist only within CASES/
	•	Case IDs do not imply hierarchy or narrative priority

⸻

README Files

Each major directory includes a README.md that:
	•	Describes scope and purpose only
	•	Makes no interpretive or evaluative claims
	•	Preserves archival neutrality
	•	Points to related structural layers when relevant

⸻

Placeholder Files

Files such as .keep may be used to:
	•	Preserve directory structure
	•	Ensure empty directories remain tracked

They carry no archival meaning.

⸻

Working Files

Files prefixed with working- are:
	•	Internal
	•	Non-canonical
	•	Subject to change

Example:

working-timeline.md


⸻

Prohibited Practices

The following are not permitted:
	•	Renaming files to improve readability
	•	Reordering parts to impose chronology
	•	Inferring intent from file names
	•	Collapsing multiple Case IDs into one

⸻

Final Note

These naming conventions are locked once files are committed.

Any future materials must conform to this standard without retroactive modification.

⸻

End of naming conventions.