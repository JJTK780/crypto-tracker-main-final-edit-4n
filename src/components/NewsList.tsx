import React from "react";
import useNews from "../hooks/useNews";
import type { NewsArticle } from "../types/NewsTypes";

export default function NewsList() {
  const { news, loading, error } = useNews();

  if (loading) {
    return <div className="text-center">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (news.length === 0) {
    return <div className="text-center">No news articles found.</div>;
  }

  return (
    <div className="space-y-4">
      {news.map((article: NewsArticle, index: number) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow dark:border-slate-700 dark:hover:border-emerald-500"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
          )}
          <h3 className="text-lg font-semibold">{article.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {article.description}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Source: {article.source.name} | Published:{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </p>
        </a>
      ))}
    </div>
  );
}
