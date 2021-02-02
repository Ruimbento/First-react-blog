export const initialState = {
  user: {
    name: "",
    isLogin: "",
    expired: "",
  },
  posts: [],
  postsComments: [],
  showingPostsCount: 8,
  articles: [],
  articlesComments: [],
  showingArticlesCount: 8,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          name: action.payload.name,
          isLogin: action.payload.isLogin,
          expired: action.payload.expired,
        },
      };

    case "SET_STATE":
      return action.payload;

    case "SAVE_STATE":
      localStorage.setItem("state", state);
      return state;

    default:
      return state;
  }
}
