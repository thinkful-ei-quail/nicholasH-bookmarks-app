'use strict';

const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const filterBookmarks = function (bookmarkList) {
  return bookmarkList.filter((bookmark) => bookmark.rating >= this.filter);
};

const toggleExpand = function (bookmark) {
  bookmark.expanded = !bookmark.expanded;
}

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
}

const setError = function (error) {
  this.error = error;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  filterBookmarks,
  toggleExpand,
  findAndDelete,
  setError
};