export const today = () => {
  const date = new Date();
  let months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];

  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const todayWithMonthNumber = () => {
  const date = new Date();
  let months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];

  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
};


export const isToday = (date: string) => {
  const today = new Date();
  const dateToCheck = new Date(date);
  return (
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
};

export const isWithInLast3Days = (date: string) => {
  const today = new Date();
  const dateToCheck = new Date(date);
  return (
    dateToCheck.getDate() >= today.getDate() - 3 &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
};