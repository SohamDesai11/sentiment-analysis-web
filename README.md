# Sentiment Analysis App

A full-stack web application that performs real-time sentiment analysis on product reviews using a state-of-the-art natural language processing model. Users can input any product review and instantly receive an AI-generated sentiment classification along with a confidence score.

---

## Overview

This application allows users to submit a product review through a clean web interface and receive an immediate sentiment prediction — **Positive**, **Negative**, or **Neutral** — powered by a transformer-based NLP model hosted on the Hugging Face Inference API. The result is displayed with an animated confidence progress bar and color-coded feedback, giving users a clear and intuitive understanding of the model's output.

Each analysis is also logged in a session-based history panel, allowing users to review and compare multiple predictions within the same session.

---

## How It Works

1. The user enters a product review into the text area and clicks **Analyze Sentiment**
2. The input is sent to a Next.js API route (`/api/analyze`)
3. The API route forwards the text to the Hugging Face Inference API using the `@huggingface/inference` SDK
4. The Cardiff RoBERTa model processes the text and returns confidence scores for each sentiment class
5. The highest-scoring label is selected and returned to the frontend as the final prediction
6. The result is displayed with a sentiment badge, animated confidence bar, and added to the session history

---

## Features

- Real-time AI sentiment classification (Positive / Negative / Neutral)
- Animated confidence score progress bar
- Color-coded result cards (green, red, yellow)
- Session-based analysis history showing the last 10 predictions
- Input validation and loading state handling
- Fully responsive layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS |
| AI Model | `cardiffnlp/twitter-roberta-base-sentiment-latest` |
| AI Provider | Hugging Face Inference API |
| SDK | `@huggingface/inference` |
| Deployment | Vercel |

---

## AI Model

The application uses [`cardiffnlp/twitter-roberta-base-sentiment-latest`](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest), a RoBERTa-based transformer model fine-tuned on a large corpus of Twitter data for sentiment classification. It supports three output classes — positive, negative, and neutral — and returns a confidence score for each, making it well-suited for analyzing short-to-medium length user-generated text such as product reviews.

---

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # Server-side API route
│   ├── page.tsx                # Home page
│   └── layout.tsx
├── components/
│   ├── Navbar.tsx
│   ├── ReviewForm.tsx          # Controlled input form
│   ├── ResultCard.tsx          # Animated result display
│   └── HistoryList.tsx         # Session history panel
├── .env.local                  # Environment variables (not committed)
└── package.json
```

---

## Local Setup

### Prerequisites
- Node.js 18 or higher
- A Hugging Face account with an API token

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/SohamDesai11/sentiment-analysis-app.git
cd sentiment-analysis-app/frontend

# 2. Install dependencies
npm install

# 3. Create environment file
echo "HUGGINGFACE_API_KEY=hf_your_token_here" > .env.local

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

> To obtain a Hugging Face API token, go to huggingface.co → Settings → Access Tokens and create a token with **"Make calls to Inference Providers"** permission enabled.

---

## Deployment

Deployed on Vercel. The `HUGGINGFACE_API_KEY` environment variable must be configured in the Vercel project settings under **Settings → Environment Variables** for the production build to function correctly.

---

## Author

**Soham Desai**
GitHub: [@SohamDesai11](https://github.com/SohamDesai11)
