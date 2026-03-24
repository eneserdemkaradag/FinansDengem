export const calculateCurrentPriceFromDailyPercent = (
  buyPrice: number,
  dailyChangePercent: number
) => buyPrice * (1 + dailyChangePercent / 100)
