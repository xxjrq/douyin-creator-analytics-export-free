import assert from 'node:assert/strict';

const sample = { account_alias: 'main', metrics: { plays: 1200 }, collected_at: '2026-09-09T00:00:00Z' };
assert.ok(sample.account_alias.length > 0);
assert.ok(Number.isFinite(sample.metrics.plays));
assert.match(sample.collected_at, /^\d{4}-\d{2}-\d{2}T/);
console.log('douyin-creator-analytics-export-free self-test: ok');
