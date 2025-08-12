import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Dashboard = () => {
  const { token, userId } = useContext(AuthContext);
  const [articles, setArticles] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState("");
  //===============================================================
  const getAllArticles = async () => {
    try {
      const result = await axios.get("http://localhost:5000/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setArticles(result.data.result);
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================
  const handleUpdateClick = (article) => {
    setUpdateBox(!updateBox);
    setArticleId(article.id);
    setTitle(article.title);
    setDescription(article.description);
    if (updateBox) updateArticle(article.id);
  };

  //===============================================================

  const updateArticle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, {
        title,
        description,
      });
      getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const updateArticleState = (article_id, comments) => {
    const newArticles = articles.map((article) => {
      if (article.id === article_id) {
        article.comments = comments;
      }
      return article;
    });
    setArticles(newArticles);
  };

  //===============================================================

  const getCommentsByArticle = async (article_id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/comments/${article_id}`);
      if (result.data.success) {
        const comments = result.data.result;
        updateArticleState(article_id, comments);
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================
  const createComment = async (article_id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/comments/${article_id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCommentsByArticle(article_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  //===============================================================

  return (
    <>
      <br />
      {articles?.map((article, index) => (
        <div key={index} className="article">
          <div>{article.title}</div>
          <div>{article.description}</div>
          {!article.comments && (
            <button
              className="ShowBtn"
              onClick={() => {
                getCommentsByArticle(article.id);
                setShow(article.id);
              }}
            >
              show comment
            </button>
          )}
          <div>
            {article.comments?.map((comment, i) => {
              return (
                <p className="comment" key={i}>
                  {comment.comment}
                </p>
              );
            })}
          </div>
          {show == article.id && (
            <div>
              <textarea
                className="commentBox"
                placeholder="comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="commentBtn"
                onClick={() => {
                  if (comment) createComment(article.id);
                }}
              >
                Add comment
              </button>
            </div>
          )}
          {article.author_id === parseInt(userId) && (
            <>
              {updateBox && articleId === article.id && (
                <form>
                  <br />
                  <input
                    type="text"
                    defaultValue={article.title}
                    placeholder="article title here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <textarea
                    placeholder="article description here"
                    defaultValue={article.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>
              )}
              <button
                className="delete"
                onClick={() => deleteArticle(article.id)}
              >
                X
              </button>
              <button
                className="update"
                onClick={() => handleUpdateClick(article)}
              >
                Update
              </button>
            </>
          )}
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
