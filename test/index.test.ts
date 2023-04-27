import { describe, expect, it } from "vitest";
import app from "../index"
import request from 'supertest';
import { connectToDatabase } from "../db/services/database.service";

describe('Renewable index', () => {
    it('should respond with a JSON object containing a message', async () => {
        await connectToDatabase()
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});