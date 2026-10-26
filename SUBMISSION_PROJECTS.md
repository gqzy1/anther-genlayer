# ANTHER

**Tagline:** A pollinator garden with evidence behind every season.

**Website:** https://gqzy1.github.io/anther-genlayer/

**Source:** https://github.com/gqzy1/anther-genlayer

## Description

ANTHER helps people compose a UK pollinator planting relay and identify estimated gaps in flowering coverage. Its GenLayer Intelligent Contract fetches RHS plant profiles, checks exact taxon identity and pollinator support, and extracts explicitly stated flowering seasons. Validators independently fetch and assess the source before comparing normalized decision fields. Accepted records determine which plants contribute in Consensus only mode. The Botticelli-inspired atelier includes botanical selection, source notes, a month-gap calendar, a free Studionet test wallet and JSON evidence export. Monthly windows are labeled planning estimates; finalized source assessments remain separate and verifiable.

## GenLayer's role

Source interpretation is central to the consensus-backed planning mode. Each stored decision binds a wallet, taxon and source URL. A missing, mismatched or unsupported assessment contributes no verified coverage. The frontend computes month gaps deterministically from eligible records and the documented seasonal mapping.

## Reproduce

Use the public Verified Example for a read-only check. For a live assessment, use the browser test wallet, submit the prefilled RHS profile once, wait for FINALIZED, then download the evidence. See [DEMO.md](DEMO.md) and [chain-evidence.json](chain-evidence.json).
