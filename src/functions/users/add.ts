'use strict';

import { updateUser } from './../../services/repository';

module.exports.handler = async (event: { body: string; }, context: any, callback: any) => {
    const data = JSON.parse(event.body);
    const response = await create(data);
    callback(null, response);
};

async function create(data: any) {
    await updateUser(data);

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    };

    return {
        headers: headers,
        body: JSON.stringify(data),
        statusCode: 200,
    };
}
