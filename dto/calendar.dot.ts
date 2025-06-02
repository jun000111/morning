export interface CalendarBlockDTO {
  user_id: number;
  currentMonthQuota: {
    month: string;
    quota: number;
  };
  nextMonthQuota: {
    month: string;
    quota: number;
  };
  blockedDates: string[];
}
