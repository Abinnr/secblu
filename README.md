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

## Production deployment on AWS EC2

The production application is deployed on an existing Ubuntu EC2 instance using Node.js, npm, PM2 and Nginx.

### Build the application

Install the exact dependencies and generate the production build:

```bash
npm ci
npm run build
```

The generated production files are stored in the `dist/` directory.

### Serve the production build using PM2

PM2 serves the production build as a static application on localhost port 3000 with SPA support.

```bash
pm2 serve dist 3000 --spa --name abin-react-app
```

The application is accessible locally at:

`http://127.0.0.1:3000`

### Configure Nginx reverse proxy

Nginx receives public HTTP and HTTPS requests and forwards application traffic to:

`http://127.0.0.1:3000`

The existing DuckDNS hostname and valid HTTPS certificate are retained. HTTP requests are redirected to HTTPS.

### Network security

- Port 22: SSH access restricted to the approved client IP.
- Port 80: Public HTTP access for HTTPS redirection.
- Port 443: Public HTTPS application access.
- Port 3000: Local application access only; no public inbound access.

### Application verification

Verify the Home, Profile and Projects pages through the public HTTPS domain.

Direct access and refreshing `/profile` and `/projects` must work correctly.

PM2 startup configuration ensures the application process can recover automatically after an EC2 reboot.

Docker and automated CI/CD pipelines are not required for this deployment.

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
