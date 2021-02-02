import React from "react";
import axios from "axios";

import BlogPostCard from "../components/BlogPostCard";
import Navigation from "../components/Navigation";

import { StateContext } from "../App";
import Footer from "../components/Footer";

function HomePage(props) {
  const [state, dispatch] = React.useContext(StateContext);

  console.log(state.user);

  const [posts, setPosts] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [showingPosts, setShowingPosts] = React.useState(8);
  const [showingArticles, setShowingArticles] = React.useState(8);

  React.useEffect(() => {
    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/posts")
      .then(({ data }) =>
        setPosts(
          data.map((item) => {
            item.image = "https://picsum.photos/400/300?" + item.id;
            item.type = "post";
            return item;
          })
        )
      );

    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/articles")
      .then(({ data }) =>
        setArticles(
          data.map((item) => {
            item.type = "article";
            return item;
          })
        )
      );
  }, []);

  return (
    <div id="HomePage">
      <header>
        <Navigation user={state.user} />
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
            {posts.map((post, index) =>
              index < 3 ? (
                <div key={post.id} className="last-post">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-description">{post.text}</p>
                  <a href={`post/${post.id}`}>Read more -></a>
                </div>
              ) : null
            )}
          </div>
        </div>
      </header>

      <div className="blog posts">
        <div className="blog-title row">
          <div className="container">
            <h2 className="col-md-10">Блог</h2>
          </div>
        </div>
        <div className="blog-container">
          {posts.map((post, index) =>
            index < showingPosts ? (
              <BlogPostCard post={post} key={post.type + "-" + post.id} />
            ) : null
          )}
        </div>
        {posts.length >= showingPosts ? (
          <p
            className="showPosts"
            onClick={() => setShowingPosts(showingPosts + 8)}
          >
            Показать больше
          </p>
        ) : null}
      </div>

      <div className="blog articles">
        <div className="blog-title row">
          <div className="container">
            <h2 className="col-md-10">Статьи</h2>
          </div>
        </div>
        <div className="blog-container">
          {articles.map((article, index) =>
            index < showingArticles ? (
              <BlogPostCard
                post={article}
                key={article.type + "-" + article.id}
              />
            ) : null
          )}
        </div>
        {articles.length >= showingArticles ? (
          <p
            className="showPosts"
            onClick={() => setShowingArticles(showingArticles + 8)}
          >
            Показать больше
          </p>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
