import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/common/news.css";

const News = props => {
  const { match } = props;

  if (match) {
    return (
      <ul className="news-list">
        {match.map((news, i) => (
          <li key={news.id}>
            <Link  to={`/stories/news/${news.id}`}>
              <h6> {news.title} </h6>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
};

export default News;
