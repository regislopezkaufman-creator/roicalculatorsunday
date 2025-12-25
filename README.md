# Sunday ROI Calculator

A React-based ROI calculator for Sunday, built with Vite and Tailwind CSS.

## 🚀 Getting Started

Since the development environment requires Node.js, please ensure you have it installed.

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

## 🌐 Deployment to Netlify

This project is configured for Netlify deployment via `netlify.toml`.

### Option A: Using Git (Recommended)
1.  Initialize a git repository: `git init`
2.  Commit your files: `git add . && git commit -m "Initial commit"`
3.  Push to GitHub/GitLab/Bitbucket.
4.  Log in to [Netlify](https://app.netlify.com).
5.  Click **"Add new site"** -> **"Import an existing project"**.
6.  Connect your repository. Netlify will detect the `npm run build` command and `dist` directory automatically from `netlify.toml`.

### Option B: Using Netlify CLI
1.  Install Netlify CLI: `npm install -g netlify-cli`
2.  Login: `netlify login`
3.  Deploy: `netlify deploy --prod`

### Option C: Manual Drop
1.  Build the project locally: `npm run build`
2.  Log in to [Netlify Drop](https://app.netlify.com/drop).
3.  Drag and drop the generated `dist` folder onto the page.
