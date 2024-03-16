export function eligibleUser(accountBirth, dateToCheck) {
  const startDate = Date.parse(dateToCheck)
  const accountCreatedAt = Date.parse(accountBirth)

  if (isNaN(startDate)) throw new BadEligibilityStartDate(startDate)
  if (isNaN(accountCreatedAt)) throw new BadAccountStartDate(accountCreatedAt)

  return accountCreatedAt > startDate
}

export class BadEligibilityStartDate extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadEligibilityStartDate'
  }
}

export class BadAccountStartDate extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadAccountStartDate'
  }
}
