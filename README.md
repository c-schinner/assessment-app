# Quiz App

## Features
- Multiple-choice question display
- Hint system that provides progressively detailed hints for incorrect answers
- Retry button to allow users to retry after wrong answers
- Animations for incorrect answers (shake effect) and correct answers (medal animation)
- Progress bar for visual feedback
- Clear and maintainable code with reusable components
- Optimized user experience by preventing multiple answers from being selected at once
- Responsive design for different screen sizes

### Installation
1. Clone the repo
`git clone https://github.com/your-username/assessment-app.git`
2. Navigate to the project directory
`cd assessment-app`
3. Install dependencies
`npm install`
4. Start the app
`expo start`

## Components
### Body
- The main component of the quiz.
- Displays the question, options, and manages user input (selected answers, retries, etc.).
- Renders the hint system and manages answer validation logic.

### Hint
- Displays a series of hints that become progressively more detailed as the user answers incorrectly.
- Controlled by state in the Body component.

### Medal
- Displays an animated medal when the user answers correctly.
- Separated for reusability and maintainability.

### ProgressBar
- Tracks the progress of the quiz and visually represents it to the user.

### Usage
1. Answering Questions
- Users select one of the multiple-choice answers and press the Submit button.
- If the answer is correct, they are rewarded with a medal.
- If incorrect, they receive a hint and are prompted to retry.

### Hint System
- The hint system displays progressively helpful hints after each incorrect attempt.
- Users must press Retry before submitting another answer.

### Animations
- A shake animation occurs on incorrect answers to visually signify the wrong choice.
- A medal animation plays when the user answers correctly.

### Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.
