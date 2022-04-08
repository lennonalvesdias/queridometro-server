'use strict';

import { listEmojis } from './../../services/repository';

module.exports.handler = async (event: any, context: any, callback: any) => {
  const result = await list();
  callback(null, result);
};

async function list() {
  const emojis = await listEmojis();

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  return {
    headers: headers,
    body: JSON.stringify(emojis),
    statusCode: 200,
  };
}
