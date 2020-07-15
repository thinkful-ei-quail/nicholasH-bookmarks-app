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

const generateAddBookmarkView = function () {
  return `
    <form class="new-bookmark js-new-bookmark">

      <label for="bookmark-url">Add New Bookmark:</label>
      <input type="text" id="bookmark-url" value="" placeholder="url" required/>

      <input type="text" id="bookmark-title" value="" placeholder="title" required/>

      <input type="text" id="bookmark-rating" value="" placeholder="rating, 1 - 5" required/>

      <input type="text" id="bookmark-description" value="" placeholder="add description (optional)" />

      <button class="cancel js-cancel">
          <span class="button-label">Cancel</span>
      </button>

      <button type="submit" value="submit">Create</button>

    </form>
  `
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
  if (!bookmarks.expanded && !store.adding) {
    const bookmarksListString = generateBookmarkString(bookmarks);
    const initialView = generateInitialView(bookmarksListString);
    $('main').html(initialView);
  } else if (store.adding) {
    const addBookmarkView = generateAddBookmarkView();
    $('main').html(addBookmarkView)
  }
};

/* Event Listeners */

const handleNewBookmark = function () {
  $('main').on('click', '.js-new-bookmark', event  => {
    // console.log('`handleNewBookmark` ran');
    store.adding = true;
    // console.log(store.adding);
    render();
  });
};

const handleCancel = function () {
  $('main').on('click', '.js-cancel', event => {
    // console.log('`handleCancel` ran');
    store.adding = false;
    // console.log(store.adding);
    render();
  });
};

const handleNewBookmarkCreate = function () {
  $('main').on('submit', '.js-new-bookmark', event => {
    console.log('`handleNewBookmarkCreate` ran');
    
  });
}
 
const bindEventListeners = function () {
  handleNewBookmark();
  handleCancel();
  handleNewBookmarkCreate();


};

export default {
  render,
  bindEventListeners
};