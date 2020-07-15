'use strict';
import $ from 'jquery';

import './styles.css';

import api from './api';
import store from './store';
import myBookmarks from './my-bookmarks';

const main = function() {
  api.getBookmarks()
    .then((bookmarks) => {
        bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
        myBookmarks.render();
    })

  myBookmarks.bindEventListeners();
  myBookmarks.render();
};

$(main);