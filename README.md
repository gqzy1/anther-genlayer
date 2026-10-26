# ANTHER

[Open the atelier](https://gqzy1.github.io/anther-genlayer/)

An evidence-led pollinator bloom relay atelier. Select plants, inspect source notes, and find estimated gaps in the February–October flowering season. The visual design draws on Botticelli's linear rhythm, botanical ornament and tempera palette.

## Run

Serve the repository root with any static HTTP server, for example `python -m http.server 8000 `. No installation or API key is required. `npm test` runs deterministic coverage and source-validation checks.

## Evidence model

The example collection links to Royal Horticultural Society profiles. Month ranges are explicitly editorial approximations of seasonal descriptions under UK conditions; they are not observed dates, exact guarantees, or onchain attestations. Climate, care, maturity and cultivar matter. Exported plans retain that distinction.

`contracts/anther.py` is the deployed GenLayer contract. It fetches an allowlisted RHS profile, resolves exact taxon identity and pollinator support, and extracts explicitly stated flowering seasons. Validators independently fetch and extract the same source, then compare normalized decision fields. Unknown or mismatched evidence contributes no seasons. Records are immutable per sender and URL; callers cannot overwrite another wallet's assessments. This is a single-source model, not independent multi-publisher corroboration.

## Network

Stable Studionet only: chain ID 61999, RPC `https://studio.genlayer.com/api`.

Contract: `0x684c996abf9346766A30c3f7CaBe369E048DA8bD`.

The website supports wallet signing, assessment submission, finality waiting, immutable record readback and JSON evidence export using genlayer-js 1.1.8. The public Verified Example reads the finalized Salvia nemorosa assessment from chain. The "Consensus only" filter excludes plants without a matching accepted record; its month windows remain editorial planning estimates, clipped to the seasons actually supported by consensus. They are labeled accordingly.

Deployment and the first source assessment both reached FINALIZED / MAJORITY_AGREE. Readback returned MATCH, SUPPORTED, and summer/autumn seasons. Receipt fields and the returned record are retained in `chain-evidence.json`. The verified write cycle used a fresh zero-balance test account with zero gas price. Browser wallet signing still requires a compatible EIP-1193 provider.

Deployment transaction: `0x57ac5996f5e5e6a8c8cc87cbe4f16aef88a2569ad943bc35a2bc28448d5816ba`.

Assessment transaction: `0xacb2f840ad4b53a1e69b92e248fbd30588bb1ffa9f9ff43e5ce26ecba35bb8b6`.

Pending transaction hashes are retained locally. Repeating the same source resumes tracking without sending another transaction. Account changes and nonzero gas prices stop submission.

## Files

- Root HTML/CSS/JS: buildless website and botanical collection.
- `contracts/anther.py`: candidate Intelligent Contract.
- `tests/`: deterministic coverage and source validation tests.

## Artwork

The original hero image was generated for ANTHER with the built-in image-generation tool. Prompt: Botticelli-inspired botanical allegory, clothed figure in a shell pavilion, copper hair, sage robes, pollinators and a pale sea; tempera, ivory, rose and celadon; no text. Botanical card graphics are code-native SVG.

## License

MIT for source code. Linked RHS content remains with its original publisher. No endorsement or affiliation is implied.
