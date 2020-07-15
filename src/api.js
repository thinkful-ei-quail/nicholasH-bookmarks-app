'use strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nhemerling';

function deleteBookmark(id) {

};

function updateBookmark(id, updateData) {

};

function createBookmark(title) {
    const newBookmark = JSON.stringify({ title });

    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    })
    .then(res => res.json())
    .then(data => data);
};

function getBookmarks() {
    return fetch(`${BASE_URL}/bookmarks`);
};

export default {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
};
