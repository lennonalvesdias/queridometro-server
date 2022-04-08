'use strict';

import { historyVote, listEmojis, listUsers } from './../services/repository';

module.exports.handler = async (event: any, context: any, callback: any) => {
    const result = await history(event.queryStringParameters);
    callback(null, result);
};

async function history(filter: any) {
    const users = await listUsers();
    const emojis = await listEmojis();
    let votes = await historyVote();

    if (filter && filter.date) {
        votes = votes.filter((vote: { date: string; }) => vote.date == filter.date);
    }

    let history: { name: any; email: any; emojis: { votes: any; label: any; }[]; }[] = [];

    users.forEach((user: { name: any; email: any }) => {
        let userEmojis: { votes: any; label: any; symbol: any; }[] = [];

        emojis.forEach((emoji: { label: any; symbol: any }) => {
            userEmojis.push({
                votes: votes.filter((vote: any) => vote.vote_on == user.name && vote.vote == emoji.symbol).length,
                label: emoji.label,
                symbol: emoji.symbol
            })
        });

        const data = {
            name: user.name,
            email: user.email,
            emojis: userEmojis
        }

        history.push(data);
    });

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    };

    return {
        headers: headers,
        body: JSON.stringify({ history, votes }),
        statusCode: 200,
    };
}
