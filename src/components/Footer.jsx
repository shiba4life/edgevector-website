export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">edge vector foundation</span>{' '}
        <span className="dim">Restoring individual control over personal data.</span>
      </p>
      <p>
        <span className="dim">PROJECTS</span>{'  '}
        <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer">FoldDB</a>{'  '}
        <a href="https://github.com/shiba4life/file_to_json" target="_blank" rel="noreferrer">file_to_json</a>
      </p>
      <p>
        <span className="dim">LINKS</span>{'    '}
        <a href="https://folddb.com" target="_blank" rel="noreferrer">folddb.com</a>{'  '}
        <a href="https://schema.folddb.com" target="_blank" rel="noreferrer">Schema Registry</a>{'  '}
        <a href="https://github.com/shiba4life/fold_db/discussions" target="_blank" rel="noreferrer">Discussions</a>
      </p>
      <p className="dim">&copy; 2025-2026 Edge Vector Foundation &mdash; Your data. Your control.</p>
    </footer>
  );
}
