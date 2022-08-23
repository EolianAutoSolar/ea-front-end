export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export default class ServiceWrapper {

    private static token?: string | null;
    private static apiUrl: string = 'http://localhost:8000/api';
    private static config: boolean = false;
    private url?: string | null;

    public constructor(url: any = null) {
        this.url = url;
    }

    private buildUrl(path: string): string {
        return `${this.url || ServiceWrapper.apiUrl}\\${path}`;
    }

    public static setToken(token: string | null) {
        ServiceWrapper.token = token;
    }

    public static isConfig() {
        return ServiceWrapper.config;
    }

    public static setUrl(url: string) {
        ServiceWrapper.config = true;
        ServiceWrapper.apiUrl = url;
    }

    public static getUrl() {
        return ServiceWrapper.apiUrl;
    }


    public request(path: string = '', method: Method = Method.GET, body?: string | FormData | ArrayBuffer, content: string = 'application/json') {
        var headers = new Headers();
        headers.set('Content-Type', content);
        if (ServiceWrapper.token) {
            headers.set('Authorization', `Token ${ServiceWrapper.token}`);
        }
        const url = this.buildUrl(path);
        const req = new Request(url, {
            mode: 'cors',
            headers: headers,
            method,
            body
        });
        return fetch(req);
    }

    public get(path: string) {
        return this.request(path, Method.GET);
    }

    public post(path: string, body: string | FormData | ArrayBuffer) {
        return this.request(path, Method.POST, body);
    }

    public put(path: string, body: string | FormData | ArrayBuffer) {
        return this.request(path, Method.PUT, body);
    }

    public delete(path: string) {
        return this.request(path, Method.DELETE);
    }
    public patch(path: string, body: string | FormData | ArrayBuffer) {
        return this.request(path, Method.PATCH, body);
    }
}