export const getRandomLink = () => {
  const result1 = Math.random().toString(36).substring(2, 7);
  const result2 = Math.random().toString(36).substring(2, 7);

  // Stan is thinking of changing xula.com to wyre.sh
  console.log(
    `======= Payment Link: https://wyre.sh/pay/${result1}-${result2} =======`
  );

  return `${result1}-${result2}`;
};
