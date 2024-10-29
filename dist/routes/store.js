import { Router } from 'express';
import { tebex } from '../tebex.js';
const router = Router();
// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const { includePackages, basketIdent, ipAddress } = req.query;
        const categories = await tebex.getCategories(includePackages === 'true', basketIdent, ipAddress);
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
// Get all packages
router.get('/packages', async (req, res) => {
    try {
        const { basketIdent, ipAddress } = req.query;
        const packages = await tebex.getPackages(basketIdent, ipAddress);
        res.json(packages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
});
// Create basket
router.post('/basket', async (req, res) => {
    try {
        const { complete_url, cancel_url, custom, complete_auto_redirect, ipAddress } = req.body;
        const basket = await tebex.createBasket(complete_url, cancel_url, custom, complete_auto_redirect, ipAddress);
        res.json(basket);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create basket' });
    }
});
// Add package to basket
router.post('/basket/:basketIdent/package', async (req, res) => {
    try {
        const { basketIdent } = req.params;
        const { package_id, quantity, type, variable_data } = req.body;
        const result = await tebex.addPackageToBasket(basketIdent, package_id, quantity, type, variable_data);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add package to basket' });
    }
});
// Get basket
router.get('/basket/:basketIdent', async (req, res) => {
    try {
        const { basketIdent } = req.params;
        const basket = await tebex.getBasket(basketIdent);
        res.json(basket);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch basket' });
    }
});
// Apply coupon/giftcard
router.post('/basket/:basketIdent/apply', async (req, res) => {
    try {
        const { basketIdent } = req.params;
        const { type, body } = req.body;
        const result = await tebex.apply(basketIdent, type, body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to apply code' });
    }
});
// Get webstore info
router.get('/info', async (req, res) => {
    try {
        const info = await tebex.getWebstore();
        res.json(info);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch webstore info' });
    }
});
export default router;
