import express from 'express';

const router = express.Router();

router.get('/criar_conta', (req, res) => {
    res.render('pages/criar_conta');
});

export default router;