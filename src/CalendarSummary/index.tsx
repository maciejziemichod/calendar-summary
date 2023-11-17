import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { CalendarSummaryDataType, getTableEventData } from "./api";

const columns: ColumnsType<CalendarSummaryDataType> = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Number of events",
    dataIndex: "numberOfEvents",
  },
  {
    title: "Total duration (minutes)",
    dataIndex: "totalDuration",
  },
  {
    title: "Longest event",
    dataIndex: "longestEventName",
  },
];

export default function CalendarSummary() {
  const [data, setData] = useState<CalendarSummaryDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const todayInMiliseconds = new Date().getTime();
    const week = new Array(7)
      .fill(null)
      .map(
        (_, index) => new Date(todayInMiliseconds + index * dayInMiliseconds),
      );

    getTableEventData(week)
      .then((newData) => {
        setData(newData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Calendar summary</h2>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: true }}
        loading={isLoading}
        summary={(currentData) => {
          if (currentData.length === 0) {
            return null;
          }

          let summaryNumberOfEvents = 0;
          let summaryTotalDuration = 0;
          let summaryLongestEventDuration = 0;
          let summaryLongestEventName = "";

          currentData.forEach(
            ({
              numberOfEvents,
              totalDuration,
              longestEventName,
              longestEventDuration,
            }) => {
              summaryNumberOfEvents += numberOfEvents;
              summaryTotalDuration += totalDuration;

              if (longestEventDuration > summaryLongestEventDuration) {
                summaryLongestEventName = longestEventName;
              }
            },
          );

          return (
            <TableSummary
              numberOfEvents={summaryNumberOfEvents}
              totalDuration={summaryTotalDuration}
              longestEventName={summaryLongestEventName}
            />
          );
        }}
      />
    </div>
  );
}

type TableSummaryProps = {
  numberOfEvents: number;
  totalDuration: number;
  longestEventName: string;
};
function TableSummary({
  numberOfEvents,
  totalDuration,
  longestEventName,
}: TableSummaryProps) {
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
      <Table.Summary.Cell index={1}>{numberOfEvents}</Table.Summary.Cell>
      <Table.Summary.Cell index={2}>{totalDuration}</Table.Summary.Cell>
      <Table.Summary.Cell index={3}>{longestEventName}</Table.Summary.Cell>
    </Table.Summary.Row>
  );
}
