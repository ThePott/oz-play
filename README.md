# 🍿 Oz Play

## 📖 Introduction
It's time to find your favorite movies, like them, and get recommended!
You can see the finished product here
https://oz-play.vercel.app

<img width="870" height="973" alt="image" src="https://github.com/user-attachments/assets/8006b0c3-dd19-4f6e-908d-fae1a8f9421d" />


## ✨ Main Feature
1. Fetch movies sorted by popularity and display in main page
2. Search movies by title
3. Responsive UI
4. Sign up and sign in with email and password
5. Create and login with social login
6. Store your favorites to the database
7. Infinite scroll
8. Toggle light / dark mode

## 🧭 Router Structure
```
- /                   → MainPage
- /detail/:movieId    → DetailPage
```

## 🛠️ Tech Stack
This app demonstrates
1. How to fetch data from TMDB and process it
2. How to social login via Supabase
3. How to create Supabase table and interact with it
4. How to make swiper using `swiper` library

## 👀 Watch this too
The following is the sever to hide environment variables from client and request to TMDB
https://github.com/ThePott/oz-play-api

## 📦 Installation
In the project directory, you can run:
```bash
git clone https://github.com/ThePott/oz-play
cd oz-play
npm install
```
## ✅ Requirements
* Node.js
## 📜 License
MIT
