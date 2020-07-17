'use strict';
import $ from 'jquery';

import store from './store';
import api from './api';

/* Templates */

const generateInitialView = function (bookmarkString) {
  return `
    <div>
      <div class="row-container">
          <button class="new-bookmark js-new-bookmark">
              <span class="button-label">New Bookmark</span>
          </button>
          <form class="js-filter-by">
              <select id="min-rating" name="min-rating">
                  <option value="" disabled selected>Filter By</option>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
              </select>
              <input type="submit" class="button" value="Submit">
          </form>
      </div>
      <ul class="bookmark-list js-bookmark-list">
        ${bookmarkString}
      </ul>
    </div>`
};

const generateAddBookmarkView = function () {
  return `
    <form class="container">
      <label for="bookmark-url">Add New Bookmark:</label>
      <input type="text" id="bookmark-url" name="bookmark-url" placeholder="url" required />

      <input type="text" id="bookmark-title" name="bookmark-title" placeholder="title" required />

      <select id="bookmark-rating" name="bookmark-rating" required>
        <option value="" disable>rating</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>

      <textarea id="bookmark-desc" name="bookmark-desc" placeholder="add description (optional)" style:"height:200px"></textarea>
    </form>
    <div class="row-container">
        <button class="cancel js-cancel">
            <span class="button-label">Cancel</span>
        </button>
        <button class="create js-create">Create</button>
    </div>
  `
};

const generateBookmarkElement = function (bookmark) {
  // let bookmarkTitle = `<span class="bookmark">${bookmark.title}</span>`;
  if (bookmark.expanded) {
    return `
      <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
        <div class="row-container">
          <div class="bookmark-title-exp js-bookmark-title">
            <h2>${bookmark.title}</h2>
          </div>
          <div>
            <button class="bookmark-delete js-bookmark-delete">
                <span class="button-label">Delete</span>
            </button>
          </div>
        </div>
        <div class="row-container" id="expand-${bookmark.id}">
          <div>
            <button class="visit-site js-visit-site">
                <a href="${bookmark.url}">Visit Site</a>
            </button>
          </div>
          <div class="bookmark-rating js-bookmark-rating">
              <h2>${bookmark.rating} / 5</h2>
          </div>
        </div>
        <div class="description js-description">
              <p>${bookmark.desc}</p>
        </div>
      </li> 
    `} else {
      return `
      <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
        <div class="row-container">
          <div class="bookmark-title js-bookmark-title">
            <h2>${bookmark.title}</h2>
          </div>
          <div class="bookmark-rating js-bookmark-rating">
              <h2>${bookmark.rating} / 5</h2>
          </div>
        </div>
      </li>
      `
    }
};

const generateBookmarkString = function (bookmarkList) {
  const filteredBookmarks = store.filterBookmarks(bookmarkList);
  // console.log(filteredBookmarks);
  const bookmarks = filteredBookmarks.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
};

const generateError = function (message) {
  return `
    <section class="error-content row-container">
      <button id="cancel-error">x</button>
      <p>${message}</p>
    </section>
  `;
};

/* Render */

const render = function () {
  let bookmarks = [...store.bookmarks];
  if (!store.adding) {
    const bookmarksListString = generateBookmarkString(bookmarks);
    const initialView = generateInitialView(bookmarksListString);
    $('main').html(initialView);
  } else if (store.adding) {
    const addBookmarkView = generateAddBookmarkView();
    $('main').html(addBookmarkView)
  };
};

const renderError = function () {
  if (store.error) {
    const errorMsg = generateError(store.error);
    $('.error-container').html(errorMsg);
  } else {
    $('.error-container').empty();
  };
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
    store.setError(null);
    renderError();
    render();
  });
};

const handleNewBookmarkCreate = function () {
  $('main').on('click', '.js-create', event => {
    event.preventDefault();
    // console.log('`handleNewBookmarkCreate` ran');
    const newUrl = $('#bookmark-url').val();
    const newTitle = $('#bookmark-title').val();
    const newRating = $('#bookmark-rating').val();
    const newDesc = $('#bookmark-desc').val();
    const newBookmarkData = {
      url: newUrl,
      title: newTitle,
      rating: newRating,
      desc: newDesc
    };
    api.createBookmark(newBookmarkData)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.adding = false;
        store.setError(null);
        // console.log(store.error);
        renderError();
        render();
      })
      .catch((error) => {
        // console.log(`handleNewBookmarkCreate error: ${error.message}`);
        store.setError(error.message);
        // console.log(error.message);
        renderError();
      });
  });
};

const handleFilterBy = function () {
  $('main').on('submit', '.js-filter-by', event => {
    event.preventDefault();
    // console.log('`handleFilterBy` ran');
    // console.log($('#min-rating').val());
    store.filter = $('#min-rating').val();
    // console.log(store.filter);
    render();
  })
};

const handleExpand = function () {
  $('main').on('click', `.js-bookmark-title`, event => {
    //console.log(`handleExpand ran`);
    const id = getBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    store.toggleExpand(bookmark);
    // console.log(bookmark.expanded);
    render();
  })
};

const getBookmarkIdFromElement = function (bookmark) {
  return $(bookmark)
    .closest('.js-bookmark-element')
    .data('bookmark-id');
};

const handleDeleteBookmarkClicked = function () {
  $('main').on('click', '.js-bookmark-delete', event => {
    // console.log('`handleDeleteBookmarkClicked` ran');
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        // console.log(`handleDeleteBookmarkClicked error: ${error.message}`);
        store.setError(error.message);
        renderError();
      });
  });
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', event => {
    //console.log('lets close this error');
    store.setError(null);
    renderError();
  })
};

const bindEventListeners = function () {
  handleNewBookmark();
  handleCancel();
  handleNewBookmarkCreate();
  handleFilterBy();
  handleExpand();
  handleDeleteBookmarkClicked();
  handleCloseError();


};

export default {
  render,
  bindEventListeners
};