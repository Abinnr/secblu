# SecuBlu Cloud Training

A lightweight, responsive deployment exercise built with Vite, JavaScript, CSS, React, and React Router. All runtime data is bundled locally. No backend, database, login, API keys, paid services, external fonts, or runtime API calls are needed.

## Requirements

Use **Node.js 24 LTS** (latest available 24.x patch) and its bundled npm. `.nvmrc` specifies `24` and `package.json` declares the compatible version range. See the [Node.js release schedule](https://github.com/nodejs/Release) and [Vite setup guide](https://vite.dev/guide/). Internet access is needed to install npm dependencies; the resulting app runs independently of those services.

## Run locally

From the project directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). `npm ci` installs the exact dependency graph recorded in the committed `package-lock.json`.

## Production build

```sh
npm run build
npm run preview
```

The production output directory is **`dist/`**. Preview normally serves it at `http://localhost:4173`. Preview is for checking the build locally; Nginx serves the static output in production. A production server does not need Node.js or `node_modules`.

## Pages and editing

| URL | Page |
| --- | --- |
| `/` | Introduction and training workflow |
| `/profile` | Editable sample name, designation, comma-separated skills, and learning goals |
| `/projects` | Three sample cloud/cybersecurity project cards |
| Any unknown path | Friendly 404 screen with a home link |

The app uses `BrowserRouter`, with normal browser paths and back/forward navigation. Profile changes are kept in React memory across navigation. Reloading restores the sample data; **Reset sample** restores it immediately. Nothing is sent to a server or saved to browser storage.

Edit `src/data.js` to change sample content or the visible version label:

```js
export const APP_VERSION = 'Version 1.0';
```

For a release exercise, change the label to `Version 1.1`, rebuild, deploy the new `dist/` contents, then verify the header and footer in your browser.

## Serve directly with Nginx

This project targets the domain root, such as `http://training.example/`. Copy the **contents** of `dist/` into the Nginx web root (the supplied example uses `/var/www/secublu`). The folder must contain `index.html`, `favicon.svg`, and `assets/`.

Use the included `nginx.conf` as a server-block example. Adapt its web root, listen address, and server name to your training machine; avoid conflicting with an existing default server. After placing it in your distribution's enabled Nginx configuration, validate and reload Nginx:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

**Browser routes need an Nginx fallback to `index.html`.** The essential rule is:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Without it, directly opening or refreshing `/profile` or `/projects` can return an Nginx 404. The fallback loads the React application, which then selects the page. Unknown app paths also return the app shell and display its friendly 404 screen; their HTTP status is 200 in this static SPA configuration. Missing files under `/assets/` return a real HTTP 404 in the provided config.

Do not open `dist/index.html` with a `file://` URL. Serve the build over HTTP. Hosting under a subdirectory requires coordinating Vite's `base`, the router's `basename`, and the Nginx location; this sample is configured for `/`.

## Deployment verification

1. Run `npm ci` and `npm run build` without errors.
2. Check Home, Profile, and Projects at desktop and mobile widths.
3. Save profile edits, navigate away and back, then test Reset sample.
4. On Nginx, directly open and refresh `/profile` and `/projects`.
5. Visit `/missing-page` and follow **Back to home**.
6. Confirm the deployed version label matches your intended release.

## Push to GitHub

This project includes an initial Git commit with `package-lock.json`. Create an empty GitHub repository, then run:

```sh
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Use your own repository URL. No repository or hosted service is needed to run the exercise locally. `.gitignore` excludes `node_modules/`, `dist/`, secret environment files, and private key files. Keep `package-lock.json` tracked; use `npm install` when intentionally changing dependencies and commit the updated lockfile.

## Source layout

```text
public/favicon.svg    Local icon
src/App.jsx           Layout, routes, pages, and profile editor
src/data.js           Sample data and version label
src/main.jsx          React entry point and BrowserRouter
src/styles.css        Responsive styles
nginx.conf            Example production server block
vite.config.js        Vite React configuration
```
