# RapL Learning Dashboard – Fresher Web Developer Assignment

## Overview
This is a small Angular-based Learning Dashboard created for the RapL Fresher Web Developer problem statement. It demonstrates Angular fundamentals, component structure, forms, data handling, responsive UI, debugging and maintainable code.

## Core Features
- Dashboard: total, completed, in-progress and not-started course counts
- Course List: name, description, status, duration, search, status filter and name sorting
- Course Details: course information, duration, lessons, status and Start/Continue action
- Add Course: validated form for course name, description, duration, lessons and status
- Responsive desktop, tablet and mobile layout
- Local storage for course data persistence

## Approach
The application is intentionally simple and focused on the stated requirements. Standalone Angular components are used for the main screens. A shared `CourseService` handles course data so components remain focused on presentation and interaction.

Flow:
1. The service provides course data.
2. Dashboard calculates course counts.
3. Course List applies search, status filtering and name sorting.
4. Course Details loads a course using its route parameter.
5. Starting a course changes its status to `In Progress`.
6. Add Course validates and stores a new course.
7. Local storage preserves changes after refresh.

## Project Structure
```text
src/
└── app/
    ├── components/
    │   ├── dashboard/
    │   ├── course-list/
    │   ├── course-details/
    │   └── add-course/
    ├── models/
    │   └── course.model.ts
    ├── services/
    │   └── course.ts
    ├── app.ts
    ├── app.html
    ├── app.css
    ├── app.routes.ts
    └── app.config.ts
```

## Important Decisions
- **Shared Course Service:** keeps course data in one place and makes a future API replacement easier.
- **Mock data:** the problem statement explicitly allows mock data instead of a backend.
- **Reactive forms:** used for validation on Add Course.
- **Local storage:** preserves course additions and status changes without a backend.
- **Simple UI:** clean, practical corporate styling instead of excessive visual effects.

## Routing
- `/dashboard`
- `/courses`
- `/courses/:id`
- `/add-course`

The default route redirects to `/dashboard`.

## Debugging Challenge
`RapL_Debugging_Challenge_Response.docx` contains the debugging response. The approach starts with reproduction and then checks browser/UI behavior, console errors, network/API activity, application code and user/account/course conditions.

## WordPress Challenge
`RapL_WordPress_Challenge_Response.docx` contains the WordPress response covering page creation, responsive design, images, avoiding regressions, testing and publishing.

The WordPress task is treated separately from the Angular application. The problem statement does not require a technical Angular-to-RapL-Genie integration.

## Future Improvements
- Connect the service to a real backend API
- Add proper authentication and role-based access
- Add automated tests
- Add API loading/error states
- Add pagination for large course lists
- Improve accessibility testing
- Model detailed course progress instead of only status

## Running the Project
```bash
npm install
ng serve
```

For a production build:
```bash
ng build
```

## Submission Contents
- Angular source code
- `README.md`
- `RapL_Debugging_Challenge_Response.docx`
- `RapL_WordPress_Challenge_Response.docx`
