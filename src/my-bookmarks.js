'use strict';
import $ from 'jquery';

import store from './store';
import api from './api';

const generateBookmarkElement = function (bookmark) {
  let bookmarkTitle = `<span class="bookmark">${bookmark.title}</span>`;
  return `
    ${bookmarkTitle}
  `;
};



const render = function () {
  let bookmarks = [...store.bookmarks];
  const bookmarksListString = generateBookmarkElement(bookmarks);
  $('main').html(bookmarksListString);
};

const bindEventListeners = function () {

};

export default {
  render,
  bindEventListeners
};