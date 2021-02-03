import React from "react";
export const StateContext = React.createContext();

export const initialState = {
  user: {
    name: "",
    isLogin: false,
    expired: "",
  },
  posts: [],
  postsComments: [],
  showingPostsCount: 8,
  articles: [],
  articlesComments: [],
  showingArticlesCount: 8,
  showEditModal: false,
  showAddModal: false,
  addPostType: "",
  postForEditing: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          name: action.payload.name,
          isLogin: action.payload.isLogin,
          expired: action.payload.expired,
        },
      };

    case "LOGOUT":
      return {
        ...state,
        user: {
          name: "",
          isLogin: false,
          expired: "",
        },
      };

    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
      };

    case "UPDATE_POST":
      return {
        ...state,
        posts: action.payload.posts,
        showEditModal: false,
        postForEditing: [],
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: action.payload.posts,
      };

    case "SAVE_POST_COMMENT":
      return {
        ...state,
        postsComments: [...state.postsComments, action.payload.postComments],
      };

    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload.articles,
      };

    case "ADD_ARTICLE":
      return {
        ...state,
        articles: [...state.articles, action.payload.post],
      };

    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: action.payload.posts,
        showEditModal: false,
        postForEditing: [],
      };

    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: action.payload.posts,
      };

    case "SAVE_ARTICLE_COMMENT":
      return {
        ...state,
        articlesComments: [
          ...state.articlesComments,
          action.payload.postComments,
        ],
      };

    case "INCREASE_SHOWING_POSTS_COUNT":
      return {
        ...state,
        showingPostsCount: state.showingPostsCount + 8,
      };

    case "INCREASE_SHOWING_ARTICLES_COUNT":
      return {
        ...state,
        showingArticlesCount: state.showingArticlesCount + 8,
      };

    case "SHOW_EDIT_MODAL":
      return {
        ...state,
        showEditModal: true,
        postForEditing: action.payload.postForEditing,
      };

    case "HIDE_EDIT_MODAL":
      return {
        ...state,
        showEditModal: false,
        postForEditing: [],
      };

    case "SHOW_ADD_MODAL":
      return {
        ...state,
        showAddModal: true,
        addPostType: action.payload.type,
      };

    case "HIDE_ADD_MODAL":
      return {
        ...state,
        showAddModal: false,
      };

    default:
      return state;
  }
}
