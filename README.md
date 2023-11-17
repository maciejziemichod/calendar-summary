# Megaron S.A. — take-home recruitment task

Hello and thank you for your interest in joining our team!

We've prepared a very brief development challenge designed to test your proficiency in the basics of JavaScript, TypeScript and React.

The task shouldn't take more than an hour to complete.

## Context

There's an event scheduling service that exposes an API. The API lists all events scheduled for a given day. The
job of this app is to gather the event data and present a summary to the user.

You *don't* need to access the service via HTTP. We've provided an API client stub — details below.

### The API

`getCalendarEvents` is the only function in the API. You specify the day by passing a date and it returns a promise that
resolves to an array of `CalendarEvent` objects.

```ts
interface CalendarEvent {
  uuid: string;
  title: string;
  durationInMinutes: number;
}

function getCalendarEvents(day: Date): Promise<CalendarEvent[]>;
```

The API client is located under `src/api-client`. Please do not modify it.

## Your task

Implement the `CalendarSummary` view. Its purpose is to display a table summarizing all the events scheduled for the **next 7 days**
(including the current date). The summary should consist of:

- The number of events on a given day.
- Total duration of all events on a given day (in minutes).
- Title of the longest event of the day.

The last row should show the same kind of summary for the entire week.

The table may look something like this:

| Date       | Number of events | Total duration [min] | Longest event |
| ---------- | ---------------: | -------------------: | ------------- |
| 2023-11-10 |                7 |                  321 | Lorem ipsum   |
| 2023-11-11 |                3 |                  123 | dolor sit     |
| ...        |              ... |                  ... | ...           |
| Total      |               26 |                 1230 | Lorem ipsum   |

## Setup

This repository already contains all the boilerplate you need. Use `npm install` to install the dependencies and `npm start` to run the application.

You may install additional npm packages if you deem it necessary.

## Requirements

- The app needs to run without any unhandled exceptions.
- The app needs to display the summary table, as described above.
- Make the code as clean and as readable as you can.

### Good luck!
