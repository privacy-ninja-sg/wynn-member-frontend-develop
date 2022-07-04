import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    getAccountInfo,
    getWalletInfo,
    getBankList,
    createBankAcc,
    registerOTP,
    verifyOTP,
    getChannels,
    registerCreate,
    getGameList,
    getGameAccountList,
    walletGameDeposit,
    walletGameWithdraw,
    createGameAccount,
    withdrawTHB,
    getBankCodeList,
    getDepositHistory,
    getWithdrawHistory,
    getTransferHistory,
    gameRevenueAll,
    changePassword
};

export default function login(username, password) {

    return fetchWrapper.post(`${baseUrl}/auth/login`, { username, password })
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
        });
}

function logout() {
    localStorage.clear();
    clearCookie()
    userSubject.next(null);
    Router.push('/login-page');
}

function getAccountInfo() {
    return fetchWrapper.get(`${baseUrl}/wynn/account/info`)
        .then(res => {
            return res;
        });
}

function getWalletInfo() {
    return fetchWrapper.get(`${baseUrl}/wynn/wallet/info`)
        .then(res => {
            return res;
        });
}

function getBankList() {
    return fetchWrapper.get(`${baseUrl}/wynn/bank/list`)
        .then(resBankList => {
            return resBankList;
        });
}

function createBankAcc(acc_name, acc_id, bank_code) {
    return fetchWrapper.post(`${baseUrl}/wynn/bank/account/create`, { acc_name, acc_id, bank_code })
        .then(res => {
            return res;
        });
}

function registerOTP(tel) {
    return fetchWrapper.post(`${baseUrl}/register/otp/request`, { tel })
        .then(res => {
            return res;
        });
}

function verifyOTP(token, pin) {
    return fetchWrapper.post(`${baseUrl}/register/otp/verify`, { token, pin })
        .then(res => {
            return res;
        });
}

function getChannels() {
    return fetchWrapper.get(`${baseUrl}/register/channels`)
        .then(res => {
            return res;
        });
}

function registerCreate(tel, req_channel, username, password, bonus, pin, token) {
    const channel = parseInt(req_channel)
    return fetchWrapper.post(`${baseUrl}/register/create`, { tel, channel, username, password, bonus, pin, token })
        .then(res => {
            return res;
        });
}

function getGameList() {
    return fetchWrapper.get(`${baseUrl}/wynn/game/list`)
        .then(res => {
            return res;
        });
}

function getGameAccountList() {
    return fetchWrapper.get(`${baseUrl}/wynn/game/account/list`)
        .then(res => {
            return res;
        });
}

function createGameAccount(req_game_id) {
    const game_id = parseInt(req_game_id)
    return fetchWrapper.post(`${baseUrl}/wynn/game/regis`, { game_id }).then(res => {
        return res
    })
}

function walletGameDeposit(req_game_id, req_amount) {
    const game_id = parseFloat(req_game_id)
    const amount = parseFloat(req_amount)
    return fetchWrapper.post(`${baseUrl}/wynn/wallet/game/deposit`, { game_id, amount })
        .then(res => {
            return res;
        });
}

function walletGameWithdraw(req_game_id, req_amount) {
    const game_id = parseFloat(req_game_id)
    const amount = parseFloat(req_amount)
    return fetchWrapper.post(`${baseUrl}/wynn/wallet/game/withdraw`, { game_id, amount })
        .then(res => {
            return res;
        });
}

function getBankCodeList() {
    return fetchWrapper.get(`${baseUrl}/wynn/bank_code/list`)
        .then(res => {
            return res;
        });
}

function withdrawTHB(req_amount) {
    const amount = parseFloat(req_amount)
    return fetchWrapper.post(`${baseUrl}/wynn/wallet/withdraw`, { amount }).then(res => {
        return res
    })
}

function getDepositHistory() {
    return fetchWrapper.get(`${baseUrl}/wynn/wallet/deposit/histories?offset=0&limit=100`).then(res => {
        return res
    })
}

function getWithdrawHistory() {
    return fetchWrapper.get(`${baseUrl}/wynn/wallet/withdraw/histories?offset=0&limit=100`).then(res => {
        return res
    })
}

function getTransferHistory() {
    return fetchWrapper.get(`${baseUrl}/wynn/wallet/game/transfer/histories?offset=0&limit=100`).then(res => {
        return res
    })
}

function gameRevenueAll() {
    return fetchWrapper.get(`${baseUrl}/wynn/wallet/game/revenue/all`)
        .then(res => {
            return res;
        });
}

function changePassword(old_password, new_password) {
    return fetchWrapper.post(`${baseUrl}/wynn/account/change-pwd`, { old_password, new_password })
        .then(res => {
            return res;
        });
}

function clearCookie() {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}
