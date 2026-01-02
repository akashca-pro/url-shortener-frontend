const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api/v1";

interface ApiClientOptions extends RequestInit {
    data?: any;
}

export async function apiClient<T>(endpoint: string, { data, ...customConfig }: ApiClientOptions = {}): Promise<T> {
    const config: RequestInit = {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            'Content-Type': data ? 'application/json' : undefined,
            ...customConfig.headers,
        } as HeadersInit,
        ...customConfig,
        credentials: 'include', // Important for cookies
    };

    if (config.body && customConfig.method && customConfig.method !== 'POST') {
         config.method = customConfig.method;
    }

    // Remove undefined headers
    if (config.headers) {
        const headers = config.headers as Record<string, string | undefined>;
        Object.keys(headers).forEach(key => headers[key] === undefined && delete headers[key]);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const responseData = await response.json().catch(() => ({}));

    if (response.ok) {
        return responseData as T;
    } else {
         const errorMessage = responseData?.message || responseData?.error || response.statusText;
        return Promise.reject({ message: errorMessage, status: response.status, ...responseData });
    }
}
