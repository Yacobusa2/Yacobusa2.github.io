import { Router } from 'express';
import Auth from './auth.mjs';
import authenticated from './guards/authenticated.mjs';
import TestsHelper from './tests/testsHelper.mjs';

const routes = Router();

routes.get('/', (req, res) => res.send('ERUDITE_API_OK_RU?'));

routes.get('/reset', (req, res) => {
    Auth.reset();
    res.send('RESET');
});

routes.get('/authorise', (req, res) => Auth.authorise(req, res));

// Add authentication check here unless moving to multi-user approach.
routes.get('/me', (req, res) => Auth.me(req, res));

routes.get('/tests/:test', async (req, res) => {
    const testID = req.params.test;
    const test = await TestsHelper.getByID(testID);
    return res.json({ test });
});

routes.get('/tests', async (req, res) => {
    const tests = await TestsHelper.get();
    return res.json({ tests });
});

routes.get('/traits', async (req, res) => {
    const traits = await TestsHelper.getTraits();
    return res.json({ traits });
});

routes.post('/tests/create', authenticated, async (req, res) => {
    const data = req.body;
    const test = await TestsHelper.create(data);
    return res.json({ test });
});

routes.post('/tests/listen/:test', authenticated, async (req, res) => {
    const test = 'SHOULD_LISTEN';
    return res.json({ test });
});

routes.post('/tests/stop/:test', authenticated, async (req, res) => {
    const test = 'SHOULD_STOP';
    return res.json({ test });
});

routes.patch('/tests/:test', authenticated, async (req, res) => {
    const id = req.params.test;
    const data = { ...req.body, id };
    const test = await TestsHelper.save(data);
    return res.json({ test });
});

routes.delete('/tests/:test', authenticated, async (req, res) => {
    try {
        const testID = req.params.test;
        const deleted = await TestsHelper.delete(testID);
        return res.json({ deleted });
        
    } catch(e) {
        console.log('Failed to delete test');
        console.error(e);
        return res.json({ deleted: false });
    }
});

routes.delete('/traits/:trait', authenticated, async (req, res) => {
    try {
        const traitID = req.params.trait;
        const deleted = await TestsHelper.deleteTrait(traitID);
        return res.json({ deleted });
        
    } catch(e) {
        console.log('Failed to delete trait');
        console.error(e);
        return res.json({ deleted: false });
    }
});

export default routes;