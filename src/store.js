'use strict';
import $ from 'jquery';

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




export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark
};