'use strict';

import store from './store';
import api from './api';

const generateBookmarkElement = function (bookmark) {
    let bookmarkTitle = `<span class="bookmark">${bookmark.title}</span>`;

};



const render = function () {
    let bookmarks = [...store.bookmarks];
    const bookmarksListString = generateBookmarkElement(bookmarks);
    $('.js-bookmarks-list').html(bookmarksListString);
};

const bindEventListeners = function () {

};

export default {
    render,
    bindEventListeners
};