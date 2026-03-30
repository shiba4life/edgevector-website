export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">edge vector foundation</span>{' '}
        <span className="dim">Building a path toward individual data ownership.</span>
      </p>
      <p>
        <span className="dim">PROJECTS</span>{'  '}
        <a href="https://github.com/EdgeVector/fold_db" target="_blank" rel="noreferrer">FoldDB</a>{'  '}
        <a href="https://github.com/EdgeVector/file_to_json" target="_blank" rel="noreferrer">file_to_json</a>
      </p>
      <p>
        <span className="dim">LINKS</span>{'    '}
        <a href="https://folddb.com" target="_blank" rel="noreferrer">folddb.com</a>{'  '}
        <a href="https://exemem.com" target="_blank" rel="noreferrer">exemem.com</a>
      </p>
      <p className="dim">&copy; 2025-2026 Edge Vector Foundation &mdash; Your data. Your control.</p>
    </footer>
  );
}
