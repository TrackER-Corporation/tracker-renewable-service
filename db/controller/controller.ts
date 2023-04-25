
import asyncHandler from 'express-async-handler'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'


export const getRenewableById = asyncHandler(async (req: any, res: any) => {
    const goal = await collections.renewable?.findOne({ _id: new ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('renewable not found')
    }
})

export const getRenewableByOrganizationId = asyncHandler(async (req: any, res: any) => {
    const goal = await collections.renewable?.find({ organizationId: new ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400).json({})
        throw new Error('Renewable not found')
    }
})


export const getRenewableByBuildingId = asyncHandler(async (req: any, res: any) => {
    const goal = await collections.renewable?.find({ buildings: new ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400).json({})
        throw new Error('Renewable not found')
    }
})


export const getAll = asyncHandler(async (req: any, res: any) => {
    const goal = await collections.renewable?.find().toArray()
    if (goal) res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('Renewable not found')
    }
})


export const create = asyncHandler(async (req: any, res: any) => {
    if (!req.body.organizationId) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const renewable = await collections.renewable?.insertOne({
        name: req.body.name,
        organizationId: req.body.organizationId,
        buildings: req.body.buildings,
        earning: req.body.earning,
        organization: req.body.organization,
        price: req.body.price,
        type: req.body.type,
        resourcesType: req.body.resourcesType,
    })
    res.status(200).json(renewable)
})

export const updateRenewable = asyncHandler(async (req: any, res: any) => {
    const renewable = await collections.renewable?.find(req.params.id)
    if (!renewable) {
        res.status(400)
        throw new Error('Renewable not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }
    const update = await collections.renewable?.updateOne({ _id: new ObjectId(req.params.id) }, req.body, {})
    res.status(200).json(update)
})


export const updateRenewableBuildingsById = asyncHandler(async (req: any, res: any) => {
    const renewable = await collections.renewable?.findOne(req.params.id)
    if (!renewable) {
        res.status(400)
        throw new Error('Renewable not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }
    renewable.buildings.push(new ObjectId(req.body.building))
    renewable.save().then(() => {
        res.status(200).json(renewable)
    }).catch((e: string) => {
        res.status(400)
        throw new Error(e)
    })
})

export const deleteRenewable = asyncHandler(async (req: any, res: any) => {
    const renewable = await collections.renewable?.findOne({ _id: new ObjectId(req.params.id) })
    if (!renewable) {
        res.status(400)
        throw new Error('Renewable not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }
    const update = await collections.renewable?.deleteOne(renewable)
    res.status(200).json(update)
})

module.exports = {
    updateRenewable,
    deleteRenewable,
    getAll,
    getRenewableById,
    create,
    getRenewableByOrganizationId,
    getRenewableByBuildingId,
    updateRenewableBuildingsById
}
