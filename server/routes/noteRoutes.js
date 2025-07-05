const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const noteModel = require('../models/noteModel')

router.get('/notes', async (req,res)=>{
    try{
        const notes = await noteModel.find()
        res.json(notes)

    }
    catch(e){
        console.log(e)
    }
})

router.post('/notes', async (req,res)=>{
    try{
        const {title, content} = req.body

        const note = new noteModel({
            title,content
        })
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    }
    catch(e){
        console.log(e)
    }
})


router.put('/notes/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const {title,content} = req.body

        const existingNote = await noteModel.findById(id)
        if(!existingNote){
            return res.status(404).json({message: 'not found'})
        }

        const updateNote = await noteModel.findByIdAndUpdate(
            id,
            {title,content},
            {new: true}
        )
        res.json(updateNote)
    }
    catch(e){
        console.log(e)
    }


})

router.delete('/notes/:id', async (req,res)=>{
    try{
        const {id} = req.params

         const existingNote = await noteModel.findById(id)
        if(!existingNote){
            return res.status(404).json({message: 'not found'})
        }

        await noteModel.findByIdAndDelete(id)
        res.json({message:'succesful delete'})

    }
    catch(e){
        console.log(e)
    }

})

module.exports = router