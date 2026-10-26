# Onchain evidence

Network: Stable Studionet, chain ID 61999.

Active contract: `0x9D6EA733ebe818251412e86aA3db1b79D8F70497`.

| Operation | Transaction | Status | Consensus |
| --- | --- | --- | --- |
| Deploy 0.2.0 | `0x5b27ec2591b856d716eeae803c9e117568c6d344052cac7d59e421d963057c32` | FINALIZED | MAJORITY_AGREE |
| Browser rosemary assessment | `0x1d0db2738ff90f2d09809ce9063ba44457da73b7a02279c1644396664f274790` | FINALIZED | MAJORITY_AGREE |

The browser used a zero-balance session wallet. The exported record identifies Salvia rosmarinus, an exact source/taxon match, supported pollinator value, and spring/summer/autumn flowering seasons.

- [Browser evidence JSON](evidence/browser-finalized.json)
- [Deployment and historical receipt fields](chain-evidence.json)
- [Contract source](contracts/anther.py)

The public Verified Example reads this record from the active contract. Seasonal source support does not certify exact monthly flowering dates. Legacy V1 evidence is retained separately and is not used by the current frontend.

Deployed source SHA-256: `c352ee5052a528a0d771f0ceb32564bab293497fab714fc4c80a9f1141625363`. The deployed bytecode payload matches `contracts/anther.py` byte-for-byte.
