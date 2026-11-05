const test = require('node:test');
const assert = require('node:assert/strict');
const { parseGasto } = require('./validation');
test('normalizes a valid expense without accepting extra fields', () => {
  assert.deepEqual(parseGasto({ categoria: ' Comida ', monto: '12.5', fecha: '2026-11-05', idgasto: 90 }), { categoria: 'Comida', monto: '12.50', fecha: '2026-11-05' });
});
test('rejects invalid amounts, missing values, and impossible dates', () => {
  const valid = { categoria: 'Comida', monto: '12', fecha: '2026-11-05' };
  for (const monto of ['', 0, 0.001, 10000000000, -1, 'abc', Infinity, true]) assert.equal(parseGasto({ ...valid, monto }), null);
  for (const fecha of ['2026-02-30', 'bad', '2026-13-01']) assert.equal(parseGasto({ ...valid, fecha }), null);
  assert.equal(parseGasto({ ...valid, categoria: ' ' }), null);
  assert.equal(parseGasto(null), null);
});
