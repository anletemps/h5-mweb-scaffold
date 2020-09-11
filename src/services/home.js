import proxyRequest from 'Utils/request';

export async function reg(params) {
    return proxyRequest.get('/api/home', params);
}
