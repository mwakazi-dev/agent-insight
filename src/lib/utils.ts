"use client";

import { parse } from "json2csv";

/**
 * Formats a Day.js date object to a readable string.
 * @param date - The Day.js date object to format.
 * @returns A formatted date string or a message if date is null.
 */
export const formatDate = (date: any): string => {
  if (date) {
    return date.format("YYYY-MM-DD HH:mm:ss");
  } else {
  }
  return "Date is not selected";
};

interface ExportData {
  [key: string]: any;
}

/**
 * Exports data to a CSV file and triggers download.
 * @param data - Array of objects to be exported as CSV.
 */
const exportToCSV = (data: ExportData[]): void => {
  try {
    const csv = parse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting to CSV:", error);
  }
};

export default exportToCSV;
