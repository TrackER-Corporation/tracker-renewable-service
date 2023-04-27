
import asyncHandler from 'express-async-handler'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'


export const getRenewableById = asyncHandler(async (req: any, res: any) => {
    const goal = await collections.renewable?.findOne({ _id: new ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        return
    }
})

export const getRenewableByOrganizationId = asyncHandler(async (req: any, res: any) => {
    console.log(req.params.id)
    const renewable = await collections.renewable?.find({ organizationId: new ObjectId(req.params.id) }).toArray()
    if (renewable && renewable.length > 0) {
        res.status(200).json(renewable)
    } else {
        res.status(400).json({ message: 'Renewable not found.' })
    }
})


export const getRenewableByBuildingId = asyncHandler(async (req: any, res: any) => {
    const renewable = await collections.renewable?.findOne({ buildings: new ObjectId(req.params.id) })
    if (renewable) {
        res.status(200).json(renewable)
    } else {
        res.status(400).json({ message: 'Renewable not found.' })
    }
})


export const getAll = asyncHandler(async (req: any, res: any) => {
    const goal = await collections.renewable?.find().toArray()
    res.status(200).json(goal)
})


export const create = asyncHandler(async (req: any, res: any) => {
    if (!req.body.organizationId) {
        res.status(400)
        return
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
    if (!req?.params?.id) {
        res.status(400)
        return
    }
    const renewable = await collections.renewable?.find(req.params.id)
    if (!renewable) {
        res.status(400)
        return
    }

    const update = await collections.renewable?.updateOne({ _id: new ObjectId(req?.params?.id) }, { $set: { ...req.body } }, {})
    res.status(200).json(update)
})


export const updateRenewableBuildingsById = asyncHandler(async (req: any, res: any) => {
    if (!!req?.params?.id) {
        res.status(400)
        return
    }
    const renewable = await collections.renewable?.findOne(new ObjectId(req.params.id))
    if (!renewable) {
        res.status(400)
        return
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
        return
    }
    if (!req.params.id) {
        res.status(401)
        return
    }
    const update = await collections.renewable?.deleteOne(renewable)
    res.status(200).json(update)
})
