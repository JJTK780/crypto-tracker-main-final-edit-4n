import { useState, useEffect } from "react";
import type { NewsArticle } from "../types/NewsTypes";

const NEWS_API_URL = "https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=770862d48d054a109cc391a9d7986d4a";

export default function useNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
          throw new Error("Error fetching news: " + response.statusText);
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return { news, loading, error };
}
