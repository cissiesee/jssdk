import httpRequest from "lk-http-request";

/**
 * @param data datadesc 
 * @return {Promise<>} {
 *  ...
 * }
 */

export function demoService(data) {
    const requestOption = {
        type: "post", //or get
        data // if has request data
    };
    return httpRequest("/*url*/", requestOption);
}