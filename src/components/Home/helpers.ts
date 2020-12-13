import { TravelPlan } from 'api';
import { getEndOf, getStartOf, isDateBetweenDates } from 'helpers/date';

export const filterTravelPlans = (
  travelPlans: TravelPlan[],
  filterDate?: Date,
) => {
  if (!filterDate) return travelPlans;

  return travelPlans.filter((travelPlan) => {
    const monthStart = getStartOf(filterDate, 'month');
    const monthEnd = getEndOf(filterDate, 'month');

    const startDate = new Date(travelPlan.startDate);
    const endDate = new Date(travelPlan.endDate);
    return (
      isDateBetweenDates(startDate, monthStart, monthEnd) ||
      isDateBetweenDates(endDate, monthStart, monthEnd)
    );
  });
};
