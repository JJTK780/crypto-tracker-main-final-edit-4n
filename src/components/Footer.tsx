export default function Footer() {
  return (
    <footer className="py-4 mt-auto text-sm text-center border-t text-slate-400 border-slate-200 dark:text-slate-400 dark:border-slate-700">
      <p className="mx-2">
        CryptoTracker © {new Date().getFullYear()}{" "}
        <a href="https://github.com/JJTK780" target="_blank" rel="author">
          Jefson
        </a>{" "}
        &{" "}
        <a href="https://github.com/drupathmm" target="_blank" rel="author">
          Drupath
        </a>
      </p>
    </footer>
  );
}
