export const getHeaderFetch = () => {
    const cookie = document.cookie;
    var xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith('XSRF-TOKEN' + '='));

    if (xsrfCookies.length === 0) {
        xsrfCookies = null;
    }else{
        xsrfCookies = decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }
    const headerFile = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Type': 'application/json',
        'cookie': cookie,
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': xsrfCookies
    };

    return headerFile;
}