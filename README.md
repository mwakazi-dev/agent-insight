# Agent Insight Application - Next.js App router, Ant Design, Firebase

## Project Overview

The project is a secure web app for field agents to log in, collect product data with geolocation tracking, and sync it with an admin dashboard. The dashboard allows real-time report generation, account management, and data visualization for administrators.

## Setup Instructions

1. Clone the repository:

` git clone [https://github.com/mwakazi-dev/agent-insight] cd [agent-insight]`

2. Install dependencies:

   `npm install`

3. Start the the app:
   `npm run dev`

4. Run unit test:
   `npm run test`

## Project Structure

- `__tests__/`: All Unit tests
- `app/`: Main application routes
- `public/`: Images and icons
- `components/`: Reusable React components
- `constants/`: For code clarity and consistency
- `context/`: Context providers to manage global state
- `hooks/`: Custom React hooks
- `lib/`: reusable functions and utilities
- `store/`: makes use of Redux toolkit for global state management
- `slices/`: slices for Redux state management
- `services/`: Services for API calls
- `styles/`: Handle all application styles
- `types/`: TypeScript type definitions

## Key Features

- Real-time data synchronization using Firebase Realtime Database
- User authentication and authorization using Firebase Authentication
- Geolocation tracking for product collection
- Admin dashboard with real-time report generation, account management, and data visualization

## Approach and Rationale

1. **TypeScript**: Implemented for improved code quality and maintainability.

2. **REST API for Form Submission**: Implemented for compatibility with existing backend systems.

3. **Modular Component Structure**: Enhances reusability and maintainability.

4. **Form Validation**: Ensures data integrity before submission.

5. **Error Handling**: Improves user experience by gracefully handling potential issues.

6. **Loading States**: Provides visual feedback during asynchronous operations.

7. **Eslint and Prettier**: Ensures consistent code style and readability

8. **Ant Design**: Used for UI components and design system.

9. **Firebase Authentication**: Secure user authentication and authorization

10. **Firebase Realtime Database**: Real-time data synchronization

11. **Husky precommit hooks**: Enforces code quality and consistency

12. **Documentation**: Added comments and documentation to enhance code readability and collaboration.

## Future Improvements

- Styling DRY principles
- Implement Storybook for component documentation, testing and team collaboration
- Refactor the codebase to follow best practices and improve code quality
- Improve testing coverage
- Implement more advanced features like data validation, error handling, and more advanced report generation
- Implement internationalization and localization
- Implement more secure authentication and authorization mechanisms
