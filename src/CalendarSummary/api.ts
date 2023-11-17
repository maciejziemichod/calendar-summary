import { getCalendarEvents } from "../api-client";

export interface CalendarSummaryDataType {
  date: string;
  numberOfEvents: number;
  totalDuration: number;
  longestEventName: string;
  longestEventDuration: number;
}

export async function getTableEventData(
  timeRange: Date[],
): Promise<CalendarSummaryDataType[]> {
  const promises = timeRange.map((day) => getCalendarEvents(day));

  const data: CalendarSummaryDataType[] = [];
  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      return;
    }

    const currentDayEvents = result.value;

    const date = timeRange[index].toLocaleDateString();
    const numberOfEvents = currentDayEvents.length;

    let totalDuration = 0;
    let longestEventDuration = 0;
    let longestEventName = "";

    currentDayEvents.forEach(({ title, durationInMinutes }) => {
      totalDuration += durationInMinutes;

      if (durationInMinutes > longestEventDuration) {
        longestEventDuration = durationInMinutes;
        longestEventName = title;
      }
    });

    data.push({
      date,
      numberOfEvents,
      totalDuration,
      longestEventName,
      longestEventDuration,
    });
  });

  return data;
}
