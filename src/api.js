'use strict';
import $ from 'jquery';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nhemerling';

function deleteBookmark(id) {
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};

function updateBookmark(id, updateData) {
  const newData = JSON.stringify(updateData);
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(`updateBookmark ${error.message}`)
    );
};

function createBookmark(bookmark) {
  const newBookmark = JSON.stringify(bookmark);

  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(`createBookmark ${error.message}`)
    );
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
