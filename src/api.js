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
    .then(res => console.log(res.json()))
    .then(data => console.log(data))
    .catch(error => error.message = 'Bookmark not found.');
};

function getBookmarks() {
  return fetch(`${BASE_URL}/bookmarks`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => error.message = 'Bookmarks not found');
};

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};
