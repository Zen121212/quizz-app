# Quiz App

## Features

- Register and login functionality.
- Admin account:
  - Email: `admin@quiz.com`
  - Password: `admin123`
- Email is used as a unique identifier.
- Checks if the user exists or if credentials are correct.
- Registration prevents duplicate emails and handles errors.
- Displays a completion status when user is registered.

## Quiz Flow

- After login, users are redirected to the Home page.
- Home page displays a list of available quizzes.
- Each quiz shows:
  - Status: "In Progress" or "Completed".
  - Title, image, score, and description.
- Clicking a quiz opens the Quiz page with a list of questions.
- Users can answer and submit to see their score.

## Admin Dashboard

- Only accessible when logged in as the admin.
- Displays:
  - A list of registered users (excluding admin).
  - Quiz results per user (if available).
  - Message if no quizzes have been taken yet.
