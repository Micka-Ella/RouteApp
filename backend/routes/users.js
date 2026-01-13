const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
  try {
    // TODO: Récupérer la liste des utilisateurs
    res.json({ users: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Récupérer un utilisateur par ID
    res.json({ user: { id } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Mettre à jour un utilisateur
    res.json({ message: 'Utilisateur mis à jour', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Supprimer un utilisateur
    res.json({ message: 'Utilisateur supprimé', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
