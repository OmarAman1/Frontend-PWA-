
const Footer = () => {
  const year = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <h2>Harry Potter Epics</h2>
        <p>Watchlists, trailers and stories from your favorite worlds.</p>
      </div>

      <div class="footer-links">
      <a href="https://github.com/OmarAman1/Frontend-PWA-" target="_blank" rel="noopener noreferrer">
        <i class="bi bi-github"></i>
        GitHub
      </a>
      </div>

      <p class="footer-copy">© ${year} Omar&David. All rights reserved.</p>
    </footer>
  `;
};

export default Footer;
