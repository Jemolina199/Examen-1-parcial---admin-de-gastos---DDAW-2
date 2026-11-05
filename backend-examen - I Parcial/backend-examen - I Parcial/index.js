const express = require('express');
const cors = require('cors');
const sequelize = require('./db/connection');
const Gasto = require('./Modelos/Gasto');
const { parseGasto } = require('./validation');
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));
function onError(res) { return res.status(500).json({ error: 'No se pudo completar la operacion' }); }
app.get('/gasto', async (_req, res) => {
  try { res.json(await Gasto.findAll({ order: [['fecha', 'DESC'], ['idgasto', 'DESC']] })); }
  catch { onError(res); }
});
app.post('/gasto', async (req, res) => {
  const data = parseGasto(req.body);
  if (!data) return res.status(400).json({ error: 'Categoria, monto positivo y fecha YYYY-MM-DD requeridos' });
  try { res.status(201).json(await Gasto.create(data)); } catch { onError(res); }
});
app.param('idgasto', (req, res, next, value) => {
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1) return res.status(400).json({ error: 'ID invalido' });
  next();
});
app.put('/gasto/:idgasto', async (req, res) => {
  const data = parseGasto(req.body);
  if (!data) return res.status(400).json({ error: 'Datos de gasto invalidos' });
  try {
    const gasto = await Gasto.findByPk(req.params.idgasto);
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.json(await gasto.update(data));
  } catch { onError(res); }
});
app.delete('/gasto/:idgasto', async (req, res) => {
  try {
    const deleted = await Gasto.destroy({ where: { idgasto: req.params.idgasto } });
    if (!deleted) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(204).end();
  } catch { onError(res); }
});
if (require.main === module) {
  sequelize.authenticate().then(() => {
    app.listen(Number(process.env.PORT || 5000), () => console.log('API de gastos lista'));
  }).catch(() => { console.error('No se pudo conectar a MySQL. Revisa la configuracion.'); process.exitCode = 1; });
}
module.exports = app;
