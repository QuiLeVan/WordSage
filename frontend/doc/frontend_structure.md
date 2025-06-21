# WordSage Frontend Structure Documentation

## Overview

The WordSage Frontend is a comprehensive mobile application built with **React Native** and **Expo**. It provides users with an intuitive language learning experience, including vocabulary lessons, quizzes, level assessments, and progress tracking. The app follows modern React Native development patterns with Redux for state management and React Navigation for screen transitions.

## Technology Stack

- **Framework**: React Native 0.72.4
- **Development Platform**: Expo SDK 49.0.5
- **State Management**: Redux Toolkit 1.9.5
- **Navigation**: React Navigation 6.1.7
- **HTTP Client**: Axios 1.4.0
- **Storage**: AsyncStorage 1.18.2
- **Animations**: Lottie React Native 5.1.6
- **Text-to-Speech**: Expo Speech 11.3.0
- **UI Components**: React Native Elements 3.4.3
- **Icons**: Expo Vector Icons 13.0.0
- **Language**: JavaScript (JSX) with TypeScript support

## Project Structure

```
frontend/
├── App.jsx                         # Main app entry point
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
├── eas.json                        # Expo Application Services config
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── src/
    ├── assets/                     # Images, icons, animations
    │   ├── adaptive-icon.png       # Android adaptive icon
    │   ├── celebration.json        # Lottie animation
    │   ├── icon.png               # App icon
    │   ├── splash1.png            # Splash screen
    │   └── ...                    # Various UI assets
    ├── components/                 # Reusable UI components
    │   ├── Question.jsx           # Quiz question component
    │   └── Screen.jsx             # Base screen wrapper
    ├── constants/                  # App constants
    │   ├── baseUrl.js             # API base URL
    │   └── colors.js              # Color palette
    ├── features/                   # Redux slices and thunks
    │   ├── auth/                  # Authentication state
    │   ├── learn/                 # Learning state
    │   ├── level-assessment/      # Level assessment state
    │   ├── level-up-test/         # Level up test state
    │   ├── profile/               # User profile state
    │   ├── quiz/                  # Quiz state
    │   └── store.js               # Redux store configuration
    ├── helpers/                    # Utility functions
    │   ├── axiosInstance.js       # Configured Axios instance
    │   ├── lessonStorage.js       # Lesson data storage
    │   ├── tokenStorage.js        # Authentication token storage
    │   └── userInfoStorage.js     # User information storage
    ├── hooks/                      # Custom React hooks
    │   └── useCountdown.js        # Countdown timer hook
    ├── navigation/                 # Navigation configuration
    │   └── AppNavigator.jsx       # Main navigation structure
    └── screens/                    # Screen components
        ├── auth/                  # Authentication screens
        ├── learn/                 # Learning screens
        ├── level-assessment/      # Level assessment screens
        ├── levelUp-test/          # Level up test screens
        ├── quiz/                  # Quiz screens
        └── shared/                # Shared/common screens
```

## Core Application Architecture

### App Entry Point (App.jsx)
The main application component sets up the core providers:
- **Redux Provider**: Wraps the app with Redux store
- **Navigation Container**: Provides navigation context
- **App Navigator**: Handles all screen routing

### Navigation Structure (AppNavigator.jsx)
The app uses **React Navigation Stack Navigator** with conditional rendering based on authentication state:

**Unauthenticated Routes:**
- `Login` → LoginScreen
- `Registration` → RegistrationScreen

**Authenticated Routes:**
- `Home` → HomeScreen (Dashboard)
- `Profile` → ProfileScreen
- `Vocabulary Lessons` → LessonListScreen
- `Lesson Information` → LessonDetailsScreen
- `Word` → WordScreen
- `Word of the Day` → WordOfTheDayScreen
- `LevelAssessment` → LevelAssessmentScreen
- `Quiz` → QuizScreen
- And more...

**Conditional Navigation Logic:**
- Shows level assessment if user hasn't been assessed
- Redirects to home after authentication
- Handles deep navigation flows

## State Management (Redux Toolkit)

### Store Configuration (store.js)
The Redux store includes the following slices:
- **auth**: Authentication and user management
- **learn**: Learning progress and lessons
- **levelAssessment**: Initial proficiency assessment
- **quiz**: Quiz functionality and results
- **profile**: User statistics and profile data
- **levelUpTest**: Level progression testing

### Authentication Slice (authSlice.js)
**State Structure:**
```javascript
{
  token: null,                    // JWT authentication token
  user: null,                     // User profile data
  loading: false,                 // Loading state for auth operations
  regError: [],                   // Registration error messages
  loginError: null,               // Login error message
  registrationSuccess: false,     // Registration success flag
  isUserFetching: false,          // User data fetching state
  errorFetchingUser: null         // User fetch error
}
```

**Key Actions:**
- `loginUser` - User authentication
- `registerUser` - User registration
- `clearAsyncStorage` - Logout functionality
- `fetchUserInfo` - Retrieve updated user data

### Learning Slice (learnSlice.js)
Manages vocabulary learning progress, lesson completion, and word mastery tracking.

### Quiz Slice (quizSlice.js)
Handles quiz sessions, question management, and result tracking.

## Screen Components Documentation

### Authentication Screens

#### LoginScreen.jsx
**Purpose**: User authentication interface.
**Key Features:**
- Email and password input fields
- Form validation
- Loading states
- Error message display
- Navigation to registration
- Social login UI (design only)

#### RegistrationScreen.jsx
**Purpose**: New user account creation.
**Key Features:**
- Multi-field registration form
- Password confirmation
- Real-time validation
- Success/error feedback
- Terms and conditions acceptance

### Core Application Screens

#### HomeScreen.jsx - Main Dashboard
**Purpose**: Primary user interface after authentication.
**Key Features:**
- **User Profile Section**: Displays user name, level, and profile image
- **Learning Progress**: Shows lesson completion status
- **Quick Actions**:
  - Continue Learning: Access to vocabulary lessons
  - Word of the Day: Daily vocabulary feature
  - Level-up Test: Progress to next proficiency level
- **Conditional UI**: Different interfaces for Expert level users
- **Statistics Integration**: Real-time progress data

#### ProfileScreen.jsx
**Purpose**: User profile management and statistics.
**Key Features:**
- User information display
- Learning statistics
- Progress charts
- Settings access
- Logout functionality

### Learning Module Screens

#### LessonListScreen.jsx
**Purpose**: Overview of available vocabulary lessons.
**Key Features:**
- Lesson categories display
- Progress indicators
- Lesson accessibility based on user level
- Navigation to specific lessons

#### LessonDetailsScreen.jsx
**Purpose**: Detailed view of individual lessons.
**Key Features:**
- Lesson description and objectives
- Word count and difficulty
- Start lesson functionality
- Progress tracking
- Quiz access

#### WordScreen.jsx
**Purpose**: Interactive vocabulary learning interface.
**Key Features:**
- **Word Display**: Large, clear word presentation
- **Definitions**: Comprehensive meaning explanations
- **Examples**: Contextual usage examples
- **Audio Pronunciation**: Text-to-speech functionality
- **Progress Tracking**: Mark words as learned
- **Navigation**: Previous/next word controls
- **Learning Actions**: Word mastery confirmation

#### StartLearningPrompt.jsx
**Purpose**: Onboarding screen for new learners.
**Key Features:**
- Welcome message
- Learning overview
- Motivation and instructions
- Begin learning action

### Assessment Screens

#### LevelAssessmentPrompt.jsx
**Purpose**: Introduction to initial proficiency assessment.
**Key Features:**
- Assessment explanation
- Expected duration
- Instructions and rules
- Start assessment action

#### LevelAssessmentScreen.jsx  
**Purpose**: Interactive proficiency test interface.
**Key Features:**
- Question display with multiple choice options
- Progress indicators
- Timer functionality
- Answer selection
- Result submission

#### LevelAssessmentResult.jsx
**Purpose**: Assessment results and level assignment.
**Key Features:**
- Score display
- Level determination explanation
- Performance breakdown
- Continue to app action

### Quiz Module Screens

#### QuizPromptScreen.jsx
**Purpose**: Quiz introduction and preparation.
**Key Features:**
- Quiz overview
- Rules and instructions
- Time limit information
- Start quiz action

#### QuizScreen.jsx
**Purpose**: Interactive quiz interface.
**Key Features:**
- Question presentation
- Multiple choice options
- Timer display
- Progress tracking
- Answer submission

#### QuizResultScreen.jsx
**Purpose**: Quiz performance results.
**Key Features:**
- Score calculation
- Correct/incorrect breakdown
- Performance feedback
- Retry or continue options

### Level Up Test Screens

#### LevelUpTestPrompt.jsx
**Purpose**: Introduction to advancement testing.
**Key Features:**
- Test explanation
- Prerequisites check
- Advancement benefits
- Start test action

#### LevelUpTestScreen.jsx
**Purpose**: Level advancement test interface.
**Key Features:**
- Advanced question presentation
- Comprehensive assessment format
- Progress tracking
- Time management

#### LevelUpTestResult.jsx
**Purpose**: Level advancement results.
**Key Features:**
- Pass/fail determination
- New level assignment (if passed)
- Performance analysis
- Next steps guidance

### Shared/Utility Screens

#### LoadingScreen.jsx
**Purpose**: Loading state display.
**Key Features:**
- Loading animation
- Consistent branding
- Smooth transitions

#### WordOfTheDayScreen.jsx
**Purpose**: Daily vocabulary feature.
**Key Features:**
- Featured word display
- Comprehensive word information
- Audio pronunciation
- Learning integration

#### FinishMessage.jsx
**Purpose**: Success/completion messaging.
**Key Features:**
- Celebration animations
- Achievement recognition
- Navigation options

## Reusable Components

### Screen.jsx - Base Screen Wrapper
**Purpose**: Consistent screen layout and behavior.
**Features:**
- Safe area handling
- Consistent padding
- Background styling
- ScrollView integration

### Question.jsx - Quiz Question Component
**Purpose**: Reusable question display for assessments and quizzes.
**Features:**
- Question text display
- Multiple choice options
- Answer selection handling
- Progress indicators
- Responsive design

## Helper Functions and Utilities

### axiosInstance.js - HTTP Client Configuration
**Purpose**: Centralized API communication setup.
**Features:**
- **Base URL Configuration**: Automatic API endpoint setup
- **Token Interceptor**: Automatic JWT token attachment
- **Request/Response Interceptors**: Error handling and processing
- **Authentication Headers**: Bearer token management

### Storage Helpers
**tokenStorage.js**:
- `setAuthToken(token)` - Store authentication token
- `getAuthToken()` - Retrieve stored token
- `removeAuthToken()` - Clear authentication token

**userInfoStorage.js**:
- `setUserInfo(user)` - Store user profile data
- `getUserInfo()` - Retrieve user data
- `removeUserInfo()` - Clear user data

**lessonStorage.js**:
- Lesson data caching and retrieval
- Offline learning support

## Custom Hooks

### useCountdown.js
**Purpose**: Timer functionality for quizzes and assessments.
**Features:**
- Configurable countdown duration
- Automatic completion handling
- Real-time updates
- Pause/resume functionality

## Design System and Styling

### Color Palette (colors.js)
```javascript
{
  primary: "#3988FF",          // Main brand color
  accentColor: "#FF6347",      // Accent/highlight color
  secondary: "#F2F2F2",        // Secondary background
  primaryText: "#333333",      // Main text color
  secondaryText: "#666666",    // Secondary text color
  primaryBackground: "#F3F4F6", // Main background
  white: "#FFFFFF",            // Pure white
  black: "#000000",            // Pure black
  gray: "#828282",             // Gray text/elements
  lightSkyBlue: "#E2ECFC",     // Light blue background
  almond: "#f1dac4",           // Warm accent color
  navy: "#000080",             // Dark blue
  darkGray: "#5A5A5A"          // Dark gray text
}
```

### Styling Patterns
- **Consistent Spacing**: Standardized margin and padding values
- **Typography Hierarchy**: Clear text size and weight patterns
- **Card-based Layout**: Consistent card component styling
- **Color Consistency**: Unified color usage across screens
- **Responsive Design**: Flexible layouts for different screen sizes

## API Integration

### Base Configuration
- **Base URL**: Configured via constants/baseUrl.js
- **Authentication**: Automatic JWT token handling
- **Error Handling**: Consistent error processing across the app

### API Communication Patterns
- **Async Thunks**: Redux Toolkit async actions for API calls
- **Loading States**: UI feedback during API operations
- **Error Handling**: User-friendly error messages
- **Token Management**: Automatic authentication header injection

## Expo Configuration

### app.json - Expo App Configuration
```json
{
  "name": "WordSage",
  "slug": "wordsage",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./src/assets/icon2.png",
  "splash": {
    "image": "./src/assets/splash1.png",
    "backgroundColor": "#3988FF"
  },
  "ios": { "supportsTablet": true },
  "android": {
    "package": "com.neaz.wordsage",
    "adaptiveIcon": {
      "foregroundImage": "./src/assets/adaptive-icon.png"
    }
  }
}
```

### Key Configuration Features
- **App Identity**: Name, version, and branding
- **Platform Support**: iOS and Android configurations
- **Asset Management**: Icons, splash screens, and images
- **Orientation**: Portrait-only interface
- **Adaptive Icons**: Android adaptive icon support

## Development Workflow

### Available Scripts
- `expo start` - Start development server
- `expo start --android` - Run on Android device/emulator
- `expo start --ios` - Run on iOS device/simulator
- `expo start --web` - Run as web application

### Development Tools
- **Expo CLI**: Command-line interface for development
- **Metro Bundler**: JavaScript bundler with hot reload
- **React Native Debugger**: Development debugging tools
- **Expo DevTools**: Browser-based development tools

### Testing and Debugging
- **Console Logging**: Comprehensive logging throughout the app
- **Error Boundaries**: Graceful error handling
- **AsyncStorage Debugging**: Storage inspection tools
- **Redux DevTools**: State debugging and inspection

## Performance Optimization

### Bundle Optimization
- **Code Splitting**: Feature-based code organization
- **Asset Optimization**: Image and animation optimization
- **Lazy Loading**: Efficient screen loading
- **Memory Management**: Proper component lifecycle management

### Runtime Performance
- **Redux State Management**: Efficient state updates
- **FlatList Usage**: Optimized list rendering for large datasets
- **Image Caching**: Efficient image loading and caching
- **AsyncStorage**: Efficient local data storage

## User Experience (UX) Features

### Navigation Experience
- **Intuitive Flow**: Logical screen progression
- **Back Navigation**: Consistent back button behavior
- **Deep Linking**: Support for deep navigation
- **Loading States**: Smooth transitions between screens

### Interactive Features
- **Text-to-Speech**: Audio pronunciation for vocabulary
- **Animations**: Lottie animations for engagement
- **Progress Tracking**: Visual progress indicators
- **Haptic Feedback**: Touch feedback (where supported)

### Accessibility
- **Screen Reader Support**: Accessibility labels and hints
- **Touch Targets**: Appropriately sized touch areas
- **Color Contrast**: Adequate contrast ratios
- **Font Scaling**: Support for system font scaling

## Offline Capabilities

### Data Persistence
- **AsyncStorage**: Local storage for user data and progress
- **Lesson Caching**: Offline access to learned content
- **Progress Sync**: Synchronization when connection restored
- **Token Persistence**: Maintains login state across app restarts

### Offline Features
- **Cached Content**: Previously loaded lessons available offline
- **Progress Tracking**: Local progress storage
- **Queue Sync**: API calls queued for when online

## Security Considerations

### Data Protection
- **Token Security**: Secure token storage using AsyncStorage
- **API Security**: HTTPS-only API communication
- **Input Validation**: Client-side input sanitization
- **Sensitive Data**: No sensitive data stored in plain text

### Authentication Security
- **JWT Tokens**: Secure authentication token handling
- **Token Expiration**: Automatic token refresh handling
- **Logout Security**: Complete data cleanup on logout

## Deployment and Distribution

### Build Configuration
- **EAS Build**: Expo Application Services for app builds
- **Platform Builds**: Separate iOS and Android configurations
- **Asset Bundling**: Optimized asset packaging
- **Version Management**: Automated version handling

### App Store Deployment
- **iOS App Store**: Ready for iOS distribution
- **Google Play Store**: Android distribution configuration
- **Over-the-Air Updates**: Expo OTA update capability
- **Asset Optimization**: Store-ready asset formats

## Future Enhancement Opportunities

### Feature Enhancements
- **Offline Mode**: Enhanced offline functionality
- **Social Features**: Learning community and sharing
- **Gamification**: Points, badges, and leaderboards
- **Personalization**: AI-driven learning recommendations
- **Multi-language**: Support for multiple interface languages

### Technical Improvements
- **TypeScript Migration**: Full TypeScript implementation
- **Performance Monitoring**: Crash reporting and analytics
- **Push Notifications**: Learning reminders and achievements
- **Biometric Authentication**: Enhanced security options
- **Accessibility**: Enhanced accessibility features

### Platform Expansion
- **Web Version**: Progressive Web App implementation
- **Tablet Optimization**: Enhanced tablet interface
- **Desktop App**: Electron-based desktop version
- **Watch App**: Smartwatch companion app

## Maintenance and Support

### Code Quality
- **Modular Architecture**: Clean separation of concerns
- **Consistent Patterns**: Standardized coding patterns
- **Documentation**: Inline code documentation
- **Error Handling**: Comprehensive error management

### Monitoring and Analytics
- **Crash Reporting**: Error tracking and reporting
- **Usage Analytics**: User behavior analysis
- **Performance Metrics**: App performance monitoring
- **User Feedback**: In-app feedback collection

This documentation provides a comprehensive overview of the WordSage mobile application architecture, making it easier for developers to understand, maintain, and extend the mobile learning platform. 