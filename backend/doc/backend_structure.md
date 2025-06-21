# WordSage Backend Structure Documentation

## Overview

WordSage is a comprehensive language learning application backend built with **NestJS**, **MongoDB**, and **TypeScript**. The backend follows a modular architecture with clean separation of concerns, implementing features for user authentication, vocabulary learning, quizzes, level assessments, and user progress tracking.

## Technology Stack

- **Framework**: NestJS (Node.js framework)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with Passport
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator and class-transformer

## Project Structure

```
backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── jwt.strategy.ts            # JWT authentication strategy
│   ├── auth/                      # Authentication module
│   ├── learn/                     # Learning module
│   ├── quiz/                      # Quiz module
│   ├── level-assessment/          # Level assessment module
│   ├── level-up-test/             # Level up test module
│   ├── profile/                   # User profile module
│   ├── dev/                       # Development utilities module
│   ├── middleware/                # Custom middleware
│   └── resources/                 # Static data files
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── doc/                          # Documentation folder
```

## Core Configuration

### Main Application (main.ts)
- **Port**: 4000
- **CORS**: Enabled for cross-origin requests
- **Validation**: Global validation pipe enabled
- **Swagger**: API documentation available at `/docs`
- **Payload Limit**: 10MB for file uploads

### Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

## Core Modules Architecture

### 1. Authentication Module (`auth/`)

**Purpose**: Handles user registration, login, and JWT-based authentication.

**Key Files**:
- `auth.controller.ts` - Authentication endpoints
- `auth.service.ts` - Authentication business logic
- `auth.module.ts` - Module configuration
- `entities/user.entity.ts` - User data model
- `dto/` - Data Transfer Objects for validation

**User Entity**:
```typescript
class User {
  email: string           // Unique, lowercase, trimmed
  password: string        // Minimum 6 characters (hashed)
  name: string           // User's full name
  level: Level           // BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
  isLevelAssessed: boolean  // Whether user completed level assessment
  isLearningStarted: boolean // Whether user started learning
}
```

**API Endpoints**:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT token)

### 2. Learning Module (`learn/`)

**Purpose**: Core vocabulary learning functionality, lesson management, and word progress tracking.

**Key Entities**:

**Word Entity**:
```typescript
class Word {
  wordNumber: number      // Sequential number within lesson/level
  word: string           // The vocabulary word (unique, lowercase)
  meaning: string        // Definition/meaning
  partOfSpeech: string   // Grammar classification
  example: string        // Usage example
  synonym: string        // Alternative words
  lessonTitle: LessonTitle // Category/topic
  level: Level           // Difficulty level
}
```

**Lesson Entity**:
```typescript
class Lesson {
  title: LessonTitle     // Topic (e.g., "Everyday Conversations")
  lessonNumber: number   // Sequential lesson number (1-10)
  icon: string          // UI icon identifier
  description: string   // Lesson description
  practiceQuiz: ObjectId // Reference to associated quiz
}
```

**Progress Tracking Entities**:
- `LessonProgress` - Tracks user's progress through lessons
- `WordProgress` - Tracks individual word learning status

**API Endpoints**:
- `GET /learn/get-lessons` - Get user's lessons with progress
- `POST /learn/start` - Initialize learning for user
- `POST /learn/start-lesson` - Start specific lesson
- `GET /learn/get-words/:lessonTitle` - Get words for lesson
- `POST /learn/word-learned` - Mark word as learned
- `POST /learn/lesson-completed/:lessonId/:lessonNumber` - Complete lesson
- `POST /learn/add-words` - Add vocabulary words (admin)
- `POST /learn/create-lessons` - Create lessons (admin)

### 3. Quiz Module (`quiz/`)

**Purpose**: Interactive quizzes for vocabulary practice and assessment.

**Key Entities**:

**Quiz Entity**:
```typescript
class Quiz {
  title: string          // Quiz title
  lessonTitle: LessonTitle // Associated lesson
  level: Level           // Difficulty level
  questions: ObjectId[]  // Array of question references
}
```

**QuizQuestion Entity**:
```typescript
class QuizQuestion {
  question: string       // Question text
  options: string[]      // Multiple choice options
  correctAnswer: string  // Correct option
  lessonTitle: LessonTitle
  level: Level
}
```

**QuizProgress Entity**:
- Tracks user's quiz attempts, scores, and completion status

**API Endpoints**:
- `GET /quiz` - Get unattempted quizzes
- `POST /quiz/start/:quizId` - Start quiz session
- `POST /quiz/end` - Submit quiz answers
- `GET /quiz/result/:lessonTitle` - Get quiz results
- `GET /quiz/status/:lessonTitle` - Check quiz completion status
- `POST /quiz/add-questions` - Add quiz questions (admin)
- `POST /quiz/create` - Create quiz (admin)

### 4. Level Assessment Module (`level-assessment/`)

**Purpose**: Initial user proficiency assessment to determine appropriate learning level.

**Key Entity**:
```typescript
class AssessmentQuestion {
  question: string       // Assessment question
  options: string[]      // Multiple choice options
  correctAnswer: string  // Correct answer
  level: Level          // Question difficulty level
}
```

**API Endpoints**:
- `GET /level-assessment/get-questions` - Get assessment questions
- `POST /level-assessment/assess-level` - Submit assessment and get level
- `POST /level-assessment/add-questions` - Add questions (admin)
- `DELETE /level-assessment/delete-questions` - Delete questions (admin)

### 5. Level Up Test Module (`level-up-test/`)

**Purpose**: Advanced testing for users to progress to higher levels.

**Key Entities**:
- `LevelUpTestQuestion` - Test questions for level progression
- `LevelUpTestProgress` - User's test progress and results

**API Endpoints**:
- `GET /level-up-test/get-questions` - Get test questions
- `POST /level-up-test/start` - Start level up test
- `POST /level-up-test/submit` - Submit test answers
- `GET /level-up-test/result` - Get test results

### 6. Profile Module (`profile/`)

**Purpose**: User profile management and statistics.

**Key Entity**:
```typescript
class LoginRecord {
  userId: ObjectId       // User reference
  loginDate: Date       // Login timestamp
}
```

**API Endpoints**:
- `GET /profile/user-info` - Get user profile information
- `GET /profile/stats` - Get user learning statistics

### 7. Development Module (`dev/`)

**Purpose**: Development and testing utilities for data management.

**API Endpoints**:
- `GET /dev/setup-stats` - Get application setup statistics
- `GET /dev/users` - Get all users (admin)
- `PATCH /dev/mark-all-lessons-as-completed/:userId/:level` - Admin utility
- `PATCH /dev/user-level/:userId/:level` - Update user level
- `DELETE /dev/test-restriction/:userId/:level` - Remove test restrictions

## Lesson Categories (LessonTitle Enum)

The application organizes vocabulary into 10 thematic categories:

1. **Everyday Conversations** - Common daily interactions
2. **Personal Information** - Identity, family, personal details
3. **Home and Living** - Household items, living spaces
4. **Food and Dining** - Meals, restaurants, cooking
5. **Travel and Transportation** - Travel, vehicles, directions
6. **Health and Wellness** - Medical, fitness, wellbeing
7. **Work and Careers** - Professional, workplace vocabulary
8. **Education and Learning** - Academic, school-related terms
9. **Nature and Environment** - Natural world, environmental topics
10. **Technology and Communication** - Digital, communication tools

## User Levels

Four proficiency levels are supported:
- **BEGINNER** - Basic vocabulary and concepts
- **INTERMEDIATE** - Moderate complexity
- **ADVANCED** - Complex vocabulary and usage
- **EXPERT** - Mastery level content

## Middleware

### Logger Middleware
- Logs all HTTP requests with timestamp, method, and URL
- Useful for debugging and monitoring

### Delay Middleware (Optional)
- Adds artificial delay for testing purposes
- Currently disabled in production

## Authentication & Security

### JWT Strategy
- Uses JWT tokens for stateless authentication
- Tokens extracted from Authorization header (Bearer token format)
- User validation on each protected route
- Automatic user object injection in request context

### Protected Routes
Most endpoints require authentication using `@UseGuards(AuthGuard())`

## Data Storage

### MongoDB Collections
- **users** - User accounts and profiles
- **words** - Vocabulary database
- **lessons** - Lesson metadata
- **lessonprogresses** - User lesson progress
- **wordprogresses** - Individual word learning status
- **quizzes** - Quiz definitions
- **quizquestions** - Quiz question bank
- **quizprogresses** - User quiz results
- **assessmentquestions** - Level assessment questions
- **leveluptestquestions** - Level up test questions
- **leveluptestprogresses** - Level up test results
- **loginrecords** - User login history

### Static Data Files (`resources/`)
- `words.json` - Complete vocabulary database
- `lessons.json` - Lesson definitions
- `assessmentQuestions.json` - Assessment question bank
- `levelUpTestQuestions.json` - Level up test questions
- `quizQuestions-*.json` - Quiz questions by category
- `mergedWords/` - Categorized vocabulary files

## API Documentation

Swagger documentation is automatically generated and available at:
- **URL**: `http://localhost:4000/docs`
- **Features**: Interactive API testing, request/response schemas, authentication

## Error Handling

- Global validation pipe for request validation
- Custom DTOs with class-validator decorators
- Proper HTTP status codes and error messages
- JWT token validation with appropriate error responses

## Performance Considerations

- MongoDB indexes on frequently queried fields
- Efficient data pagination for large datasets
- Optimized queries for user progress tracking
- Caching strategies for static content

## Development Workflow

### Available Scripts
- `npm run start` - Start development server with watch mode
- `npm run build` - Build production bundle
- `npm run start:prod` - Start production server
- `npm run lint` - Code linting
- `npm run test` - Run tests

### Code Quality
- ESLint configuration for consistent code style
- Prettier for code formatting
- TypeScript for type safety
- Modular architecture for maintainability

## Database Schema Design

### Relationships
- **User** ↔ **LessonProgress** (One-to-Many)
- **User** ↔ **WordProgress** (One-to-Many)
- **User** ↔ **QuizProgress** (One-to-Many)
- **Lesson** ↔ **Quiz** (One-to-One)
- **Quiz** ↔ **QuizQuestion** (One-to-Many)
- **Word** → **Lesson** (via lessonTitle)

### Indexing Strategy
- Unique compound indexes for data integrity
- Performance indexes on frequently queried fields
- User-based queries optimization

## Deployment Considerations

### Environment Variables Required
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (should be complex and secure)

### Production Recommendations
- Use environment-specific configuration
- Implement proper logging and monitoring
- Set up database backups
- Configure HTTPS and security headers
- Implement rate limiting for API endpoints

This documentation provides a comprehensive overview of the WordSage backend architecture, suitable for developers implementing new features or reviewing the codebase. 