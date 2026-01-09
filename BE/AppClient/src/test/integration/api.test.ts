// @vitest-environment node
import { describe, it, expect } from 'vitest';
import apiClient from '@/lib/api';

// Mock localStorage for Node environment
if (typeof localStorage === "undefined" || localStorage === null) {
    global.localStorage = {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
        length: 0,
        key: () => null,
    } as any;
}

// Mock window for Node environment
if (typeof window === "undefined") {
    global.window = {
        location: { href: '' }
    } as any;
}

// Force IPv4 to avoid localhost resolution issues
apiClient.defaults.baseURL = 'http://127.0.0.1:8000/api';

describe('Integration Test: Backend API Connection', () => {
    it('should connect to the backend API', async () => {
        try {
            const response = await apiClient.get('/user');
            expect(response.status).toBe(200);
        } catch (error: any) {
            if (error.response) {
                // We accept 401 (Unauthorized) as a successful CONNECTION test
                expect([401, 200]).toContain(error.response.status);
            } else {
                throw error;
            }
        }
    });
});
