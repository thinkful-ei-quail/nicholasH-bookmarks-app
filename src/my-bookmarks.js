'use strict';
import $ from 'jquery';

import store from './store';
import api from './api';

/* Templates */

const generateInitialView = function (bookmarkString) {
  return `
    <div class="container">
      <div class="button-row-container">
          <button class="new-bookmark js-new-bookmark">
              <span class="button-label">New Bookmark</span>
          </button>
          <form class="js-filter-by">
              <select id="min-rating" name="min-rating">
                  <option value=1>Filter By:</option>
                  <option value=1>1 Star</option>
                  <option value=2>2 Stars</option>
                  <option value=3>3 Stars</option>
                  <option value=4>4 Stars</option>
                  <option value=5>5 Stars</option>
              </select>
              <input type="submit">
          </form>
      </div>
      <ul class="bookmark-list js-bookmark-list">
        ${bookmarkString}
      </ul>
    </div>`
}


const generateBookmarkElement = function (bookmark) {
  let bookmarkTitle = `<span class="bookmark">${bookmark.title}</span>`;
  return `
    <li class="js-bookmark-element">
      ${bookmarkTitle}
      <div class="bookmark-rating js-bookmark-rating">
          <p>${bookmark.rating}</p>
      </div>
    </li>
  `;
};

const generateBookmarkString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
}

/* Render */

const render = function () {
  let bookmarks = [...store.bookmarks];
  if (!bookmarks.expanded) {
    const bookmarksListString = generateBookmarkString(bookmarks);
    const initialView = generateInitialView(bookmarksListString);
  $('main').html(initialView);
  } else if (bookmarks.expanded) {
    
  }
};

/* Event Listeners */

const bindEventListeners = function () {

};

export default {
  render,
  bindEventListeners
};