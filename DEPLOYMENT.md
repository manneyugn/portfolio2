# Vercel Deployment Guide

## Prerequisites

- Install Vercel CLI: `npm i -g vercel`
- Create a Vercel account at https://vercel.com

## Deployment Steps

### 1. Login to Vercel

```bash
vercel login
```

### 2. Deploy to Vercel

From your project root directory:

```bash
vercel
```

Follow the prompts:

- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N** (for first deployment)
- What's your project's name? Enter your desired name
- In which directory is your code located? **./** (current directory)

### 3. Environment Variables (Optional)

If you need to set environment variables:

```bash
vercel env add SECRET_KEY
```

### 4. Subsequent Deployments

For future deployments, simply run:

```bash
vercel --prod
```

## Project Structure for Vercel

```
/
├── api/
│   └── index.py          # Main Flask application
├── static/               # Static files (CSS, JS, images)
├── templates/            # HTML templates
├── requirements.txt      # Python dependencies
├── vercel.json          # Vercel configuration
└── .vercelignore        # Files to ignore during deployment
```

## Important Notes

- The Flask app is now configured to work with Vercel's serverless environment
- Static files and templates are properly referenced
- The app will be accessible at your-project-name.vercel.app
- All routes will work through the serverless function
