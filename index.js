// filepath: d:\fature_soneb_app\facture-soneb-supabase\index.js
require('dotenv').config();
console.log('Environment variables loaded successfully.');

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Route GET pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Facture SONEB !');
});

// Route POST pour insérer des données
app.post('/insert', async (req, res) => {
  const { cellule, valeur } = req.body;

  const { data, error } = await supabase
    .from('factures')
    .insert([{ cellule, valeur }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true, data });
});

// Route GET pour récupérer toutes les factures
app.get('/factures', (req, res) => {
  console.log('Route GET /factures appelée');
  res.send('Route GET /factures fonctionne');
});

// Route GET pour tester la connexion à Supabase
app.get('/test-supabase', async (req, res) => {
  const { data, error } = await supabase.from('factures').select('*');
  if (error) {
    console.error('Erreur Supabase :', error.message);
    return res.status(500).send('Erreur de connexion à Supabase');
  }
  res.send('Connexion à Supabase réussie');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
