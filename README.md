# ConnectIn

A professional networking platform inspired by LinkedIn, built with modern web technologies. ConnectIn enables users to create professional profiles, connect with others, share content, and communicate in real-time.

## 🌐 Live Demo

**Live Preview:** [https://connectin-tygz.onrender.com/](https://connectin-tygz.onrender.com/)

## 📋 About

ConnectIn is a full-stack social networking application designed for professionals. It provides a comprehensive platform where users can build their professional identity, share insights through posts, and engage with their network through real-time messaging.

## ✨ Key Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure account creation with email and password
- **Google OAuth Integration**: One-click sign-in using Google accounts
- **Password Management**: Forgot password and secure password reset functionality
- **Session Management**: Secure JWT-based authentication with NextAuth.js

### 👤 Profile Management
- **Comprehensive Profiles**: Create detailed professional profiles with:
  - Profile and cover images (powered by ImageKit)
  - Professional headline and about section
  - Work experience history (multiple positions)
  - Education background (multiple entries)
  - Skills showcase
  - Language proficiency levels
  - Location information (city and country)
- **Profile Customization**: Update and edit all profile sections dynamically
- **Profile Viewing**: View other users' profiles with complete information

### 📱 Social Feed
- **Create Posts**: Share text content and images
- **Engage with Content**: Like and unlike posts
- **Comments System**: Add, view, and delete comments on posts
- **Post Management**: Delete your own posts
- **Activity Feed**: View posts from your network in chronological order

### 💬 Real-Time Messaging
- **Instant Messaging**: Real-time chat powered by Socket.io
- **Conversation Management**: Create and manage multiple conversations
- **Message History**: View complete conversation history
- **Chat Interface**: Modern, responsive chat UI with message timestamps
- **Delete Conversations**: Remove conversations when needed

### 🔍 Discovery & Networking
- **User Search**: Search and discover other professionals on the platform
- **Network Management**: Build and manage your professional network
- **People Discovery**: Browse and connect with professionals

### 🖼️ Image Management
- **ImageKit Integration**: Efficient image upload and CDN delivery
- **Profile Images**: Upload and update profile pictures
- **Cover Images**: Customize profile cover images
- **Post Images**: Attach images to your posts

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern, responsive styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database with Mongoose ODM
- **Express.js**: Custom server for Socket.io integration
- **NextAuth.js**: Authentication and session management

### Real-Time Features
- **Socket.io**: WebSocket-based real-time communication

### Services & Tools
- **ImageKit**: Image upload and CDN services
- **Nodemailer**: Email service for password reset
- **Bcrypt**: Password hashing and security

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- ImageKit account (for image uploads)
- Google OAuth credentials (optional, for Google sign-in)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd final_year_project_2025
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
final_year_project_2025/
├── app/                    # Next.js app directory
│   ├── (authentication)/  # Auth routes (signin, signup, etc.)
│   ├── (connectin)/       # Main app routes (home, profile, messaging)
│   └── api/               # API routes
├── components/            # React components
│   ├── home/              # Home feed components
│   ├── profile/            # Profile-related components
│   └── ui/                 # Reusable UI components
├── context/               # React Context providers
├── lib/                   # Utility libraries and configurations
├── models/                # MongoDB models
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## 🎯 Features in Detail

### Authentication Flow
- Secure registration with password hashing
- Email verification for password resets
- Persistent sessions with JWT tokens
- Protected routes with middleware

### Profile System
- Rich profile data model supporting multiple work experiences and education entries
- Real-time profile updates
- Image upload with automatic optimization

### Social Features
- Interactive post system with likes and comments
- Real-time updates using context providers
- User activity tracking

### Messaging System
- Socket.io-powered real-time messaging
- Conversation threading
- Message persistence in MongoDB
- Online status tracking

## 📝 Notes

- The application uses a custom Express server alongside Next.js to support Socket.io
- ImageKit is integrated for efficient image management
- All user data is securely stored in MongoDB
- The application is responsive and works on desktop and mobile devices

## 🔒 Security Features

- Password encryption with bcrypt
- Secure session management
- Protected API routes
- Input validation and sanitization
- Secure password reset tokens with expiration

---

**Built with ❤️ for professional networking**
