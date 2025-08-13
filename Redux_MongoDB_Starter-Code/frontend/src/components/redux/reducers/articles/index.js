import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },

    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },

    updateArticleById: (state, action) => {
      const updatedArticle = action.payload;
      const index = state.articles.findIndex(
        (article) => article._id === updatedArticle._id
      );
      if (index !== -1) {
        state.articles[index] = updatedArticle;
      }
    },

    deleteArticleById: (state, action) => {
      const idToDelete = action.payload;
      state.articles = state.articles.filter(
        (article) => article._id !== idToDelete
      );
    },

    setComments: (state, action) => {
      const { article_id, comments } = action.payload;
      const article = state.articles.find((a) => a._id === article_id);
      if (article) {
        article.comments = comments;
      }
    },

    addComment: (state, action) => {
      const { article_id, comment } = action.payload;
      const article = state.articles.find((a) => a._id === article_id);
      if (article) {
        if (!Array.isArray(article.comments)) {
          article.comments = [];
        }
        article.comments.push(comment);
      }
    },
  },
});

export const {
  setArticles,
  addArticle,
  updateArticleById,
  deleteArticleById,
  setComments,
  addComment,
} = articlesSlice.actions;

export default articlesSlice.reducer;
