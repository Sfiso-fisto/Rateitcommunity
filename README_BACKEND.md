# RateIt Backend API

A complete REST API for the RateIt community ratings platform built with Node.js, Express, and MongoDB.

## 🚀 Installation

```bash
npm install
cp .env.example .env
npm run dev
```

## 📋 Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

## 🔌 API Endpoints

### Authentication

#### Register
- **POST** `/api/auth/register`
- Body: `{ username, email, password }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`

#### Verify Token
- **GET** `/api/auth/verify`
- Headers: `Authorization: Bearer token`

---

### Posts

#### Create Post
- **POST** `/api/posts`
- Auth: Required
- Body: `{ title, category, description, videoUrl }`

#### Get All Posts
- **GET** `/api/posts?category=car&page=1&limit=10&sort=-createdAt`
- Query: `category`, `page`, `limit`, `sort`

#### Get Single Post
- **GET** `/api/posts/:id`

#### Update Post
- **PUT** `/api/posts/:id`
- Auth: Required (author only)
- Body: `{ title, description, ... }`

#### Delete Post
- **DELETE** `/api/posts/:id`
- Auth: Required (author only)

#### Get Trending Posts
- **GET** `/api/posts/trending/top`

---

### Ratings

#### Submit/Update Rating
- **POST** `/api/ratings`
- Auth: Required
- Body: `{ postId, score (1-100), comment }`

#### Get Post Ratings
- **GET** `/api/ratings/post/:postId`

#### Get User Rating
- **GET** `/api/ratings/user/:postId`
- Auth: Required

#### Delete Rating
- **DELETE** `/api/ratings/:ratingId`
- Auth: Required (rater only)

---

### Users

#### Get User Profile
- **GET** `/api/users/:userId`

#### Update Profile
- **PUT** `/api/users`
- Auth: Required
- Body: `{ username, bio, avatar }`

#### Follow User
- **POST** `/api/users/:userId/follow`
- Auth: Required

#### Unfollow User
- **POST** `/api/users/:userId/unfollow`
- Auth: Required

#### Get User Posts
- **GET** `/api/users/:userId/posts?page=1&limit=10`

---

### Categories

#### Get All Categories
- **GET** `/api/categories`

#### Get Category
- **GET** `/api/categories/:id`

---

## 📊 Response Format

### Success
```json
{
  "message": "Success message",
  "data": {}
}
```

### Error
```json
{
  "error": "Error message"
}
```

## 🔐 Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer eyJhbGc...
```

## 🧪 Testing

```bash
npm test
```

## 📦 Deployment

### Heroku
```bash
heroku create rateit-api
git push heroku main
```

### Railway
Connect GitHub repository and deploy

---

## 📝 Notes

- All passwords are hashed with bcryptjs
- Duplicate ratings per user are prevented via unique index
- Posts auto-calculate average ratings
- Views are tracked per post
- JWT tokens expire in 7 days
