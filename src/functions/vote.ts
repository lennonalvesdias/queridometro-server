'use strict';

import * as uuid from 'uuid';
import { updateVote } from './../services/repository';

module.exports.handler = async (event: { body: string; }, context: any, callback: any) => {
    const data = JSON.parse(event.body);
    const response = await vote(data);
    callback(null, response);
};

async function vote(data: any) {
    const { user, valuesFromForm, date } = data;

    for (const property in valuesFromForm) {
        if (property != "password") {
            const data = {
                id: uuid.v1(),
                vote_by: user,
                vote_on: property,
                vote: valuesFromForm[property],
                date: date
            }
            await updateVote(data);
        }
    }

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
