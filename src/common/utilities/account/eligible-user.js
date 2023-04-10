export function eligibleUser(accountBirth, dateToCheck) {
  const startDate = Date.parse(dateToCheck)
  const accountCreatedAt = Date.parse(accountBirth)

  if (isNaN(startDate) || isNaN(accountCreatedAt)) return false

  return accountCreatedAt > startDate
}
