const { Router } = require('express');
const { model } = require('mongoose');
const BucketListItem = require('../../models/BucketListItem.js');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const BucketListItems = await BucketListItem.find();
        if(!BucketListItems) throw new Error('No BucketListItems found!');
        const sorted = BucketListItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    const newBucketListItem = new BucketListItem(req.body);

    try {
        const bucketListItem = await newBucketListItem.save();
        if(!bucketListItem) throw new Error('An error occurred while saving the bucketListItem!');
        res.status(200).json(bucketListItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await BucketListItem.findByIdAndUpdate(id, req.body);
        if(!response) throw new Error('Something went terribly wrong :/');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const removed = await BucketListItem.findByIdAndDelete(id, req.body);
        if(!removed) throw new Error('Something went terribly wrong :/');
        res.status(200).json(removed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;