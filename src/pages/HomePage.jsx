import React from "react";
import axios from "axios";
import { StateContext } from "../reducer";
import { Link } from "react-router-dom";
import { generatePostText } from "../utils";

import BlogPostCard from "../components/BlogPostCard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";

function HomePage() {
  const [state, dispatch] = React.useContext(StateContext);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  React.useEffect(() => {
    fetchArticles();
  }, []);

  const fetchPosts = () => {
    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/posts")
      .then(({ data }) => {
        dispatch({
          type: "SET_POSTS",
          payload: {
            posts: data.map((item) => {
              item = generatePostText(item);
              item.image = "https://picsum.photos/400/300?" + item.id;
              item.imageBig = "https://picsum.photos/1200/600?" + item.id;
              item.type = "post";

              return item;
            }),
          },
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const fetchArticles = () => {
    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/articles")
      .then(({ data }) => {
        dispatch({
          type: "SET_ARTICLES",
          payload: {
            articles: data.map((item) => {
              item = generatePostText(item);
              item.type = "article";
              item.imageBig = item.image;

              return item;
            }),
          },
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const increaseShowingCount = (type) => {
    dispatch({
      type: `INCREASE_SHOWING_${type}_COUNT`,
    });
  };

  const handleShowAddModal = (type) => {
    console.log(1);
    dispatch({
      type: "SHOW_ADD_MODAL",
      payload: {
        type: type,
      },
    });
  };

  return (
    <div id="HomePage">
      <header>
        <Navigation />
        <div className="container">
          <div className="blog-header col-md-9">
            <p>
              А этот текст чуть выше предыдущего, но так же рассказывает что-то
              про блог
            </p>
            <h1>Тут обычный текст о том, что этот блог №1</h1>
            <button onClick={() => alert("Она не тыкается, не тыкай")}>
              А это кнопка
            </button>
          </div>
          <div className="last-posts col-md-3">
            {state.posts.map((post, index) =>
              index < 3 ? (
                <div key={post.id} className="last-post">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-description">{post.description}</p>
                  <Link to={`post/${post.id}`}>Read more -></Link>
                </div>
              ) : null
            )}
          </div>
        </div>
      </header>

      <div className="blog posts">
        <div className="blog-title row">
          <div className="container">
            <h2 className="col-md-11">Блог</h2>
            <span
              className="add col-md-1"
              onClick={() => handleShowAddModal("post")}
            >
              +
            </span>
          </div>
        </div>
        <div className="blog-container">
          {state.posts.map((post, index) =>
            index < state.showingPostsCount ? (
              <BlogPostCard post={post} key={post.type + "-" + post.id} />
            ) : null
          )}
        </div>
        {state.posts.length > state.showingPostsCount ? (
          <p
            className="showPosts"
            onClick={() => increaseShowingCount("POSTS")}
          >
            Показать больше
          </p>
        ) : null}
      </div>

      <div className="blog articles">
        <div className="blog-title row">
          <div className="container">
            <h2 className="col-md-11">Статьи</h2>
            <span
              className="add col-md-1"
              onClick={() => handleShowAddModal("article")}
            >
              +
            </span>
          </div>
        </div>
        <div className="blog-container">
          {state.articles.map((article, index) =>
            index < state.showingArticlesCount ? (
              <BlogPostCard
                post={article}
                key={article.type + "-" + article.id}
                user={state.user}
              />
            ) : null
          )}
        </div>
        {state.articles.length > state.showingArticlesCount ? (
          <p
            className="showPosts"
            onClick={() => increaseShowingCount("ARTICLES")}
          >
            Показать больше
          </p>
        ) : null}
      </div>

      <EditModal />
      <AddModal />

      <Footer />
    </div>
  );
}

export default HomePage;
