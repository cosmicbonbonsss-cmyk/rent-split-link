# Rent Split Link

A dependency-free, offline rent-split prototype. It divides rent into equal shares, tracks optional amounts already paid, and encodes the current state in the URL hash for sharing. No data leaves the page.

## Open it

- Double-click `index.html`, or open it directly as a `file://` URL.
- Alternatively, from this folder run:

  ```bash
  python -m http.server
  ```

  Then open <http://localhost:8000> in a browser.

Use **Copy share link** to copy a URL containing the current rent, roommates, and payments. Opening that URL restores the state.
