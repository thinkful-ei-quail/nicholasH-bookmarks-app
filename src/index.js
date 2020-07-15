'use strict';
import $ from 'jquery';

import api from './api';
import store from './store';
import myBookmarks from './my-bookmarks';

const main = function() {
//   api.getBookmarks()
//     .then((bookmarks) => {
//         bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
//         myBookmarks.render();
//     })

//   myBookmarks.bindEventListeners();
//   myBookmarks.render();
    console.log('DOM is loaded');

    const startMsg = $('<p>Webpack is working!</p>');
    $('main').append(startMsg)
};

$(main);