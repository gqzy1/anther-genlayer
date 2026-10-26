# ANTHER

[Open the atelier](https://gqzy1.github.io/anther-genlayer/)

An evidence-led pollinator bloom relay atelier. Select plants, inspect source notes, and find estimated gaps in the February–October flowering season. The visual design draws on Botticelli's linear rhythm, botanical ornament and tempera palette.

## Run

Serve the repository root with any static HTTP server, for example `python -m http.server 8000 `. No installation or API key is required. `npm test` runs deterministic coverage and source-validation checks.

## Quick start

See [DEMO.md](DEMO.md). Use **Use free test wallet**, then **Assess with GenLayer** once. After finality, download the assessment evidence. A wallet extension is optional; the session key stays in the browser tab. Do not fund this test wallet.

## Evidence model

The example collection links to Royal Horticultural Society profiles. Month ranges are explicitly editorial approximations of seasonal descriptions under UK conditions; they are not observed dates, exact guarantees, or onchain attestations. Climate, care, maturity and cultivar matter. Exported plans retain that distinction.

`contracts/anther.py` is the deployed GenLayer contract. It fetches an allowlisted RHS profile, resolves exact taxon identity and pollinator support, and extracts explicitly stated flowering seasons. Validators independently fetch and extract the same source, then compare normalized decision fields. Unknown or mismatched evidence contributes no seasons. Records are immutable per sender and URL; callers cannot overwrite another wallet's assessments. This is a single-source model, not independent multi-publisher corroboration.

## Network

Stable Studionet only: chain ID 61999, RPC `https://studio.genlayer.com/api`.

Contract: `0x9D6EA733ebe818251412e86aA3db1b79D8F70497`.

The website supports wallet signing, assessment submission, finality waiting, immutable record readback and JSON evidence export using genlayer-js 1.1.8. The public Verified Example reads the finalized Salvia rosmarinus assessment from chain. The "Consensus only" filter excludes plants without a matching accepted record; its month windows remain editorial planning estimates, clipped to the seasons actually supported by consensus. They are labeled accordingly.

The active deployment and browser source assessment both reached FINALIZED / MAJORITY_AGREE. Readback returned MATCH, SUPPORTED, and spring/summer/autumn seasons. Receipt fields and the returned record are retained in `chain-evidence.json`. The verified write cycle used a fresh zero-balance test account with zero gas price. The browser session-wallet flow completes submission, finality, readback and JSON export without an extension. External wallets require a compatible EIP-1193 provider.

Deployment transaction: `0x5b27ec2591b856d716eeae803c9e117568c6d344052cac7d59e421d963057c32`.

Assessment transaction: `0x1d0db2738ff90f2d09809ce9063ba44457da73b7a02279c1644396664f274790`.

Pending transaction hashes are retained locally. Repeating the same source resumes tracking without sending another transaction. Account changes and nonzero gas prices stop submission.

Version 0.2.0 uses structured JSON response mode and explicit fenced-JSON normalization. Legacy V1 transactions, including a failed JSON parse, are retained under `legacyV1` in the evidence file. The active address is the one above.

## Files

- Root HTML/CSS/JS: buildless website and botanical collection.
- `contracts/anther.py`: candidate Intelligent Contract.
- `tests/`: deterministic coverage and source validation tests.

## Artwork

The original hero image was generated for ANTHER with the built-in image-generation tool. Prompt: Botticelli-inspired botanical allegory, clothed figure in a shell pavilion, copper hair, sage robes, pollinators and a pale sea; tempera, ivory, rose and celadon; no text. Botanical card graphics are code-native SVG.

## License

MIT for source code. Linked RHS content remains with its original publisher. No endorsement or affiliation is implied.
