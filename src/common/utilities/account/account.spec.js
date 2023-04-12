import { eligibleUser } from './eligible-user'
import { BadEligibilityStartDate } from './eligible-user'
import { BadAccountStartDate } from './eligible-user'

const ISOAccountCreationsDate = '2015-10-22T09:49:47.000Z'
const testStartBeforeDate = new Date('March 25, 2015 2:00:30 PM GMT-07:00')
const testStartAfterDate = new Date('November 29, 2022 10:20:00 AM')

describe('ElibibleUser', () => {
  it('should return true if user started after the test start date', () => {
    expect(eligibleUser(ISOAccountCreationsDate, testStartBeforeDate)).toBeTruthy()
  })

  it('should return false if user started before the test start date', () => {
    expect(eligibleUser(ISOAccountCreationsDate, testStartAfterDate)).toBeFalsy()
  })

  it('should return false if user started at the same time as the start date', () => {
    expect(eligibleUser(ISOAccountCreationsDate, ISOAccountCreationsDate)).toBeFalsy()
  })

  it('should return false bad test start date is passed in', () => {
    expect(() => eligibleUser(ISOAccountCreationsDate, 'Cheese')).toThrow(BadEligibilityStartDate)
  })

  it('should return false a bad account date is passed in', () => {
    expect(() => eligibleUser('Cheese', testStartAfterDate)).toThrow(BadAccountStartDate)
  })
})
