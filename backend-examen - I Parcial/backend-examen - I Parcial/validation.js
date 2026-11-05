function parseGasto(body) {
  if (!body || typeof body !== 'object') return null;
  const { categoria, monto, fecha } = body;
  if (typeof categoria !== 'string' || !categoria.trim() || categoria.trim().length > 255) return null;
  if (!['string', 'number'].includes(typeof monto) || !Number.isFinite(Number(monto)) || Number(monto) < 0.01 || Number(monto) > 9999999999.99) return null;
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return null;
  const date = new Date(`${fecha}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== fecha) return null;
  return { categoria: categoria.trim(), monto: Number(monto).toFixed(2), fecha };
}
module.exports = { parseGasto };
