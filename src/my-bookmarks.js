'use strict';
import $ from 'jquery';

import store from './store';
import api from './api';

/* Templates */

const generateInitialView = function (bookmarkString) {
  return `
    <div class="container">
      <div class="row-container">
          <button class="new-bookmark js-new-bookmark">
              <span class="button-label">New Bookmark</span>
          </button>
          <form class="js-filter-by">
              <select id="min-rating" name="min-rating">
                  <option value="0">Filter By:</option>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
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
    <form class="container js-new-bookmark">
      <label for="bookmark-url">Add New Bookmark:</label>
      <input type="text" id="bookmark-url" name="bookmark-url" placeholder="url" required />

      <input type="text" id="bookmark-title" name="bookmark-title" placeholder="title" required />

      <input type="text" id="bookmark-rate" name="bookmark-rating" placeholder="rating, 1 - 5" required />

      <textarea id="bookmark-desc" name="bookmark-desc" placeholder="add description (optional)" style:"height:200px"></textarea>
      <div class="row">
        <button class="cancel js-cancel">
            <span class="button-label">Cancel</span>
        </button>
        <button class="js-create" type="submit">Create</button>
      </div>
    </form>
  `
}


const generateBookmarkElement = function (bookmark) {
  let bookmarkTitle = `<span class="bookmark">${bookmark.title}</span>`;
  return `
    <li class="js-bookmark-element">
      <div class="row-container">
        <div class="container">
          ${bookmarkTitle}
        </div>
        <div class="container bookmark-rating js-bookmark-rating">
            <p>${bookmark.rating} / 5 stars</p>
        </div>
      </div>
    </li>
  `;
};

const generateBookmarkString = function (bookmarkList) {
  const filteredBookmarks = bookmarkList.filter((bookmark) => bookmark.rating >= store.filter);
  // console.log(filteredBookmarks);
  const bookmarks = filteredBookmarks.map((bookmark) => generateBookmarkElement(bookmark));
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
  $('main').on('click', '.js-create', event => {
    event.preventDefault();
    // console.log('`handleNewBookmarkCreate` ran');
    
  });
}

const handleFilterBy = function () {
  $('main').on('submit', '.js-filter-by', event => {
    event.preventDefault();
    // console.log('`handleFilterBy` ran');
    // console.log($('#min-rating').val());
    store.filter = $('#min-rating').val();
    // console.log(store.filter);
    render();
  })
}
 
const bindEventListeners = function () {
  handleNewBookmark();
  handleCancel();
  handleNewBookmarkCreate();
  handleFilterBy();


};

export default {
  render,
  bindEventListeners
};