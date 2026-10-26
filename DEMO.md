# Explore ANTHER

[Open the atelier](https://gqzy1.github.io/anther-genlayer/).

## Compose a flowering relay

Add or remove plants and inspect the uncovered months. Each botanical card links to its Royal Horticultural Society profile. Month windows are UK planning approximations, not exact observations.

## Assess a source

1. Scroll to **Bring your own evidence**. The rosemary profile is prefilled.
2. Choose **Use free test wallet**, or connect an EIP-1193 wallet on Stable Studionet (61999).
3. Click **Assess with GenLayer** once and wait for finality. Then download the assessment evidence.

The test wallet is generated in your browser, requires no funds, and keeps its key in this tab's session storage. Do not send funds to it. Closing the tab may remove access to that wallet; its public records remain onchain. Submission stops if gas price is nonzero.

## Inspect the result

A supported result contains an exact taxon match and explicit source-backed flowering seasons. **Consensus only** excludes collection plants without accepted evidence, and clips planning months to the supported seasons. It does not turn month estimates into observed bloom dates. Current composition uses four curated plants; assessments for other plants can be inspected and exported as source records.

**Verified Example** reads an existing finalized record without a wallet. The transaction evidence link contains the contract address, transaction hashes and decision fields.

A source can be assessed once per wallet and contract version. If tracking is interrupted, the same source resumes the original transaction rather than submitting another. A terminal failure is not retried automatically.
