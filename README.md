# 🚀 RateIt - Community Ratings App

A modern web application where users can rate and share content across multiple categories. Built with React, Node.js, Express, and MongoDB.

## Features

✨ **7 Rating Categories**
- 🚗 Rate My Car
- 🏢 Rate My Business
- ⚡ Rate My Brand
- 👶 Rate My Parenting
- 👟 Rate My Shoe
- 🎨 Rate My Art
- 🎬 Rate a Movie

✨ **Core Features**
- User authentication with JWT
- Create, edit, delete posts
- Rate posts on 1-100 scale
- Follow/unfollow users
- Trending posts
- User profiles
- Comments on ratings

## Tech Stack

**Frontend:**
- React 18
- CSS-in-JS (inline styles)
- Responsive design

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Installation

### Backend Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token

### Posts
- `GET /api/posts` - Get all posts with pagination
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)
- `GET /api/posts/trending` - Get trending posts

### Ratings
- `POST /api/ratings` - Submit/update rating (authenticated)
- `GET /api/ratings/post/:postId` - Get ratings for a post
- `DELETE /api/ratings/:ratingId` - Delete rating (authenticated)

### Users
- `GET /api/users/:userId` - Get user profile
- `GET /api/users/:userId/posts` - Get user's posts
- `POST /api/users/:userId/follow` - Follow user (authenticated)
- `POST /api/users/:userId/unfollow` - Unfollow user (authenticated)
- `PUT /api/users` - Update profile (authenticated)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:categoryId` - Get specific category

## Project Structure

```
rateitcommunity/
├── server.js                 # Main backend entry
├── models/                   # MongoDB schemas
│   ├── User.js
│   ├── Post.js
│   └── Rating.js
├── routes/                   # API routes
│   ├── auth.js
│   ├── posts.js
│   ├── ratings.js
│   ├── users.js
│   └── categories.js
├── middleware/
│   └── auth.js
├── utils/
│   └── validators.js
├── src/
│   ├── components/
│   │   └── RateIt.jsx        # Main React component
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
└── package.json
```

## Running the App

1. **Start Backend:**
   ```bash
   npm run dev
   # Backend runs on http://localhost:5000
   ```

2. **Start Frontend (in new terminal):**
   ```bash
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

3. **Access the app:**
   Open http://localhost:3000 in your browser

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/rateit
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env.frontend)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_TOKEN_KEY=rateit_token
```

## License

Boost Software License 1.0

## Author

Sfiso-fisto

---

**Built with ❤️ for the RateIt community**
