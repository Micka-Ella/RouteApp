const express = require('express');
const router = express.Router();

// GET /api/routes
router.get('/', async (req, res) => {
  try {
    // TODO: Récupérer la liste des routes
    res.json({ routes: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/routes/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Récupérer une route par ID
    res.json({ route: { id } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/routes
router.post('/', async (req, res) => {
  try {
    const { name, description, startPoint, endPoint, waypoints } = req.body;
    // TODO: Créer une nouvelle route
    res.status(201).json({ message: 'Route créée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/routes/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Mettre à jour une route
    res.json({ message: 'Route mise à jour', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/routes/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Supprimer une route
    res.json({ message: 'Route supprimée', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
