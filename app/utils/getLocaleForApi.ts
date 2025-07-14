export function getLogoutForApi(request: Request): string {
    const referer = request.headers.get('referer');
    const parts = referer?.split('/') || [''];
    const result = parts.slice(0, 4).join('/') + '/logout';

    return result;
}