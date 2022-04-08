'use strict';

import { list, listParams, update } from './database';

export async function listUsers(): Promise<any> {
    return await list(process.env.USERS_TABLE!);
}

export async function listEmojis(): Promise<any> {
    return await list(process.env.EMOJIS_TABLE!);
}

export async function updateUser(data: any): Promise<void> {
    await update(process.env.USERS_TABLE!, data);
}

export async function updateEmoji(data: any): Promise<void> {
    await update(process.env.EMOJIS_TABLE!, data);
}

export async function updateVote(data: any): Promise<void> {
    await update(process.env.VOTES_TABLE!, data);
}

export async function historyVote(): Promise<any> {
    return await list(process.env.VOTES_TABLE!);
}
