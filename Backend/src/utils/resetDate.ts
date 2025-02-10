import { addMonths } from 'date-fns';

export const calculateResetDate = (createdAt: Date) => {// createdAt as provided
    // a month after the user joined
    const oneMonthLater = addMonths(createdAt, 1);
    return oneMonthLater;
}
