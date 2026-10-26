"""Offline invariants; these checks do not emulate GenVM or consensus."""
import ast
import unittest
from pathlib import Path
module = ast.parse(Path('contracts/anther.py').read_text())
subset = ast.Module(body=[n for n in module.body if isinstance(n, (ast.Assign, ast.FunctionDef))], type_ignores=[])
import json
ns = {"json":json}
exec(compile(subset, '<normalization>', 'exec'), ns)
normalize = ns['normalize']
class NormalizationTests(unittest.TestCase):
    def test_unknown_never_contributes_seasons(self):
        self.assertEqual(normalize({'identity':'UNKNOWN','pollinator':'SUPPORTED','seasons':['summer']})['seasons'], [])
    def test_mismatch_never_contributes_seasons(self):
        self.assertEqual(normalize({'identity':'MISMATCH','pollinator':'SUPPORTED','seasons':['summer']})['seasons'], [])
    def test_canonical_season_equivalence(self):
        self.assertEqual(normalize({'identity':'MATCH','pollinator':'SUPPORTED','seasons':['summer','spring','summer']})['seasons'], ['spring','summer'])
    def test_hallucinated_season_fails(self):
        with self.assertRaises(ValueError):normalize({'identity':'MATCH','pollinator':'SUPPORTED','seasons':['year-round']})
    def test_unexpected_fields_fail(self):
        with self.assertRaises(ValueError):normalize({'identity':'MATCH','pollinator':'SUPPORTED','seasons':[],'override':True})
class ResponseTests(unittest.TestCase):
    def test_fenced_json_is_parsed_without_relaxing_fields(self):
        raw='```json\n{"identity":"MATCH","pollinator":"SUPPORTED","seasons":["summer"]}\n```'
        self.assertEqual(ns['parse_response'](raw)['seasons'], ['summer'])
    def test_empty_response_fails_closed(self):
        with self.assertRaises(ValueError):ns['parse_response']('')
    def test_prose_is_not_treated_as_evidence(self):
        with self.assertRaises(ValueError):ns['parse_response']('Trust me: SUPPORTED')
if __name__ == '__main__': unittest.main()
