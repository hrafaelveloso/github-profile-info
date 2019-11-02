const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        userRepos: [],
        error: "",
      };
    case "SET_ERROR_USER":
      return {
        ...state,
        user: {},
        userRepos: [],
        error: action.payload,
      };
    case "SET_USER_REPOS":
      return {
        ...state,
        userRepos: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
