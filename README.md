### Don't Forget to give a star 

## Project info

**URL**: http://madhavendrasingh.netlify.app/

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/MadhavendraSinghShaktawat/Retro-Pixel-Portfolio.git

# Step 2: Navigate to the project directory.
cd Retro-Pixel-Portfolio

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Follow these steps to deploy this project using the Netlify CLI.

```sh
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login
# This will open a browser window to authenticate.

# 3. Build Your Project
# Make sure your project is ready to deploy (build it first):
npm run build
# Replace with yarn build if using Yarn.

# 4. Deploy
# First-time deployment (to a draft URL):
netlify deploy
# When prompted for a folder to deploy, select your build output folder (e.g., dist, build, or out)
# It will return a draft URL

# Production deployment:
netlify deploy --prod
# This deploys to your live production URL.
```
#Note
change the file name in netlify.toml is its not dist, if its build then build