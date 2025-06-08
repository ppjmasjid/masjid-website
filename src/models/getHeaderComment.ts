// src/utils/getHeaderComment.ts
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  
  export function getHeaderComment(
    statusByMonth: {
      [key: string]: {
        status: 'paid' | 'unpaid';
        providedDate?: string;
      };
    } | undefined,
    selectedYear: string
  ) {
    if (!statusByMonth) return 'Normal';
  
    let earlyPaymentCount = 0;
    months.forEach(month => {
      const key = `${month}${selectedYear}`;
      const providedDate = statusByMonth[key]?.providedDate;
      if (providedDate) {
        const day = parseInt(providedDate.split('-')[2], 10);
        if (day < 5) earlyPaymentCount++;
      }
    });
  
    if (earlyPaymentCount > 5) {
      return 'Excellent';
    } else if (earlyPaymentCount >= 3) {
      return 'Good';
    } else {
      return 'Normal';
    }
  }
  