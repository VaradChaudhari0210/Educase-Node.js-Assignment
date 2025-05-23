const express = require('express');
const router = express.Router();
const {PrismaClient} = require('../generated/prisma'); 
const prisma = new PrismaClient();
const havershineDistance = require('../utils/distanceUtil');

//Post a new school
router.post('/addSchool', async (req,res) => {
    const {name, address, latitude, longitude} = req.body;
    if(!name || !address || isNaN(latitude) || isNaN(longitude)){
        return res.status(400).json({error: 'Please provide all required fields'});
    }
    try {
        const newSchool = await prisma.schools.create({
            data:{
                name,
                address,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            }
        });
        res.status(201).json({ message: 'School added', school: newSchool });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

//Get list of schools in order of distance from user
router.get('/listSchools', async (req,res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    if(isNaN(userLat) || isNaN(userLon)){
        return res.status(400).json({error: 'Please provide valid latitude and longitude'});
    }
    try {
        const schools = await prisma.schools.findMany();
        const sortedSchools = schools.map(school => {
            const havershine = havershineDistance(userLat, userLon, school.latitude, school.longitude);
            return {...school, havershine: parseFloat(havershine.toFixed(2))};
        }).sort((a, b) => a.havershine - b.havershine);
        res.status(200).json(sortedSchools);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

module.exports = router;