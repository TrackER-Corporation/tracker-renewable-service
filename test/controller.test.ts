import { beforeAll, describe, expect, it, vi } from "vitest";
import { create, deleteRenewable, getAll, getRenewableByBuildingId, getRenewableById, getRenewableByOrganizationId, updateRenewable, updateRenewableBuildingsById } from "../db/controller/controller";
import { connectToDatabase } from "../db/services/database.service";

describe('Renewable controller', () => {
    beforeAll(async () => {
        await connectToDatabase()
        vi.clearAllMocks();
    });

    it('should return a 400 status code if any required fields are missing', async () => {
        const req = {
            params: {
                id: '6300a343707609fd28d22e6e',
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        expect(async () => await getRenewableById(req, res, {})).rejects.toThrow(/Error/);
    });


    it('should return existing renewable', async () => {
        const req = {
            params: {
                id: '62f4e99d35a23bdcb64f94f9',
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        await getRenewableById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not return existing renewable from organization Id', async () => {
        const req = {
            params: {
                id: 'a2ebb9ef62137fef13963caf',
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        expect(async () => await getRenewableByOrganizationId(req, res, {})).rejects.toThrow(/Error/);
    });

    it('should return existing renewable from organization Id', async () => {
        const req = {
            params: { id: '62ebb9ef62137fef13963caf', },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        await getRenewableByOrganizationId(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not return renewable from building Id', async () => {
        const req = {
            params: {
                id: '6ad969dc498c4385d676ce43',
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        expect(async () => await getRenewableByBuildingId(req, res, {})).rejects.toThrow(/Error/);
    });


    it('should return renewable from building Id', async () => {
        const req = {
            params: {
                id: '62ed1f97d158cb42b69e5356',
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        await getRenewableByBuildingId(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should get all renewable', async () => {
        const req = {
            params: {
                organizationId: '62ebb9ef62137fef13963caf',
            },
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        await getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not create an renewable', async () => {
        const req = {
            params: {
                organizationId: '62ebb9ef62137fef13963caf',
            },
            body: {},
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        expect(async () => await create(req, res, {})).rejects.toThrow(/Error/);
    });

    it('should update a renewable', async () => {
        const req = {
            params: {
                id: '62ebb9ef62137fef13963caa',
            },
            body: {},
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        await updateRenewable(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should not update renewable', async () => {
        const req = {};
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        expect(async () => await updateRenewable(req, res, {})).rejects.toThrow(/Error/);
    });

    it('should not update a renewable', async () => {
        const req = {
            params: {
                id: '62ebb9ef62137fef13963caa',
            },
        };
        const req2 = { params: {} };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        expect(async () => await updateRenewableBuildingsById(req, res, {})).rejects.toThrow(/Error/);
        expect(async () => await updateRenewableBuildingsById(req2, res, {})).rejects.toThrow(/Error/);
    });


    it('should not delete an organization by ID', async () => {
        // Create a new building to be deleted
        const req = {
            params: {
                _id: "62f4e99d35a23bdcb64f9dd",
            },
            body: {}
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        expect(async () => await deleteRenewable(req, res, {})).rejects.toThrow(/Error/);
    })
});
