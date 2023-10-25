import { Status } from "@prisma/client";

export const issues = [
  {
    id: 101,
    title: "Database Connection Error",
    description:
      "Users are reporting issues connecting to the database. Investigate and fix the problem.",
    status: "OPEN" as Status,
    createdAt: "2023-10-10T08:15:00.000Z",
    updatedAt: "2023-10-10T08:15:00.000Z",
  },
  {
    id: 102,
    title: "User Authentication Bug",
    description:
      "There is a bug in the user authentication system causing logins to fail intermittently.",
    status: "IN_PROGRESS" as Status,
    createdAt: "2023-10-11T09:30:00.000Z",
    updatedAt: "2023-10-11T09:45:00.000Z",
  },
  {
    id: 103,
    title: "Homepage Design Issue",
    description:
      "The homepage layout is broken on certain screen sizes. Design adjustments needed.",
    status: "OPEN" as Status,
    createdAt: "2023-10-12T10:45:00.000Z",
    updatedAt: "2023-10-12T10:45:00.000Z",
  },
  {
    id: 104,
    title: "Performance Degradation",
    description:
      "System performance has significantly degraded during peak hours. Optimize the code.",
    status: "OPEN" as Status,
    createdAt: "2023-10-13T11:20:00.000Z",
    updatedAt: "2023-10-13T11:20:00.000Z",
  },
  {
    id: 105,
    title: "Billing Module Enhancement",
    description: "Enhance the billing module to support new pricing plans.",
    status: "IN_PROGRESS" as Status,
    createdAt: "2023-10-14T12:10:00.000Z",
    updatedAt: "2023-10-14T12:15:00.000Z",
  },
  {
    id: 106,
    title: "Mobile App Crash",
    description:
      "The mobile app crashes on startup for some Android devices. Investigate and fix.",
    status: "OPEN" as Status,
    createdAt: "2023-10-15T13:55:00.000Z",
    updatedAt: "2023-10-15T14:00:00.000Z",
  },
  {
    id: 107,
    title: "404 Page Not Found",
    description:
      "Some URLs are returning 404 errors. Investigate and update routing rules.",
    status: "OPEN" as Status,
    createdAt: "2023-10-16T14:45:00.000Z",
    updatedAt: "2023-10-16T14:45:00.000Z",
  },
  {
    id: 108,
    title: "Data Import Issue",
    description:
      "Data import process is failing, causing data discrepancies. Troubleshoot and resolve.",
    status: "CLOSED" as Status,
    createdAt: "2023-10-17T15:30:00.000Z",
    updatedAt: "2023-10-17T15:30:00.000Z",
  },
  {
    id: 109,
    title: "Email Notifications Delayed",
    description:
      "Email notifications are delayed by several hours. Investigate email delivery process.",
    status: "IN_PROGRESS" as Status,
    createdAt: "2023-10-18T16:20:00.000Z",
    updatedAt: "2023-10-18T16:30:00.000Z",
  },
  {
    id: 110,
    title: "Search Functionality Bug",
    description:
      "The search feature is not returning accurate results. Fix the search algorithm.",
    status: "OPEN" as Status,
    createdAt: "2023-10-19T17:40:00.000Z",
    updatedAt: "2023-10-19T17:40:00.000Z",
  },
  {
    id: 111,
    title: "Login Page Redesign",
    description: "Redesign the login page for a more user-friendly experience.",
    status: "OPEN" as Status,
    createdAt: "2023-10-20T18:05:00.000Z",
    updatedAt: "2023-10-20T18:05:00.000Z",
  },
  {
    id: 112,
    title: "API Integration Error",
    description:
      "There is an error in the third-party API integration. Review and update the integration.",
    status: "IN_PROGRESS" as Status,
    createdAt: "2023-10-21T19:10:00.000Z",
    updatedAt: "2023-10-21T19:15:00.000Z",
  },
  {
    id: 113,
    title: "Data Export Issue",
    description:
      "Data export process is failing to generate reports. Fix data export functionality.",
    status: "OPEN" as Status,
    createdAt: "2023-10-22T20:25:00.000Z",
    updatedAt: "2023-10-22T20:25:00.000Z",
  },
  {
    id: 114,
    title: "Password Reset Bug",
    description:
      "Users cannot reset their passwords due to a bug. Fix the password reset process.",
    status: "OPEN" as Status,
    createdAt: "2023-10-23T21:15:00.000Z",
    updatedAt: "2023-10-23T21:15:00.000Z",
  },
  {
    id: 115,
    title: "Payment Gateway Integration",
    description: "Integrate a new payment gateway for processing payments.",
    status: "IN_PROGRESS" as Status,
    createdAt: "2023-10-24T22:30:00.000Z",
    updatedAt: "2023-10-24T22:45:00.000Z",
  },
  {
    id: 116,
    title: "404 Page Redirection",
    description:
      "Update the 404 page to redirect users to a relevant page with suggestions.",
    status: "OPEN" as Status,
    createdAt: "2023-10-25T23:40:00.000Z",
    updatedAt: "2023-10-25T23:40:00.000Z",
  },
  {
    id: 117,
    title: "Account Deactivation Feature",
    description:
      "Implement a feature to allow users to deactivate their accounts.",
    status: "IN_PROGRESS" as Status,
    createdAt: "2023-10-26T08:55:00.000Z",
    updatedAt: "2023-10-26T09:00:00.000Z",
  },
  {
    id: 118,
    title: "Security Vulnerability Patch",
    description:
      "Apply a security patch to fix a known vulnerability in the system.",
    status: "OPEN" as Status,
    createdAt: "2023-10-27T09:15:00.000Z",
    updatedAt: "2023-10-27T09:15:00.000Z",
  },
  {
    id: 119,
    title: "Report Generation Enhancement",
    description:
      "Enhance the report generation process to support custom report templates.",
    status: "OPEN" as Status,
    createdAt: "2023-10-27T09:15:00.000Z",
    updatedAt: "2023-10-27T09:15:00.000Z",
  },
  {
    id: 120,
    title: "Mobile App Push Notifications",
    description:
      "Implement push notifications in the mobile app for important updates.",
    status: "CLOSED" as Status,
    createdAt: "2023-10-10T09:45:00.000Z",
    updatedAt: "2023-10-10T09:45:00.000Z",
  },
];

export const users = [
  {
    name: "Peter Norvig",
    email: "pnorvig@example.com",
    image: "/users/pnorvig.jpeg",
  },
  {
    name: "Douglas Crockford",
    email: "dcrockford@example.com",
    image: "/users/dcrockford.png",
  },
  {
    name: "Linus Torvalds",
    email: "ltorvalds@example.com",
    image: "/users/ltorvalds.jpeg",
  },
  {
    name: "Jane Anderson",
    email: "janderson@example.com",
    image: "/users/janderson.gif",
  },
  {
    name: "Anna Taylor",
    email: "ataylor@example.com",
    image: "/users/ataylor.jpeg",
  },
  {
    name: "Tony Childs",
    email: "tony.childs@gmail.com",
    image: "/users/tony.childs.png",
  },
];
