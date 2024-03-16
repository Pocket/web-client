import { gql } from './gql'

describe('gql function', () => {
  it('should return an empty string when no parameters are passed', () => {
    const result = gql``
    expect(result).toEqual('')
  })

  it('should return the same string when only one string literal is passed', () => {
    const result = gql`query { hello }` //prettier-ignore
    expect(result).toEqual('query { hello }')
  })

  it('should interpolate one variable into the string', () => {
    const name = 'John'
    const result = gql`query { user(name: ${name}) }`
    expect(result).toEqual('query { user(name: John) }')
  })

  it('should interpolate multiple variables into the string', () => {
    const name = 'John'
    const age = 30
    const result = gql`query { user(name: ${name}, age: ${age}) }`
    expect(result).toEqual('query { user(name: John, age: 30) }')
  })

  it('should handle special characters in the variables', () => {
    const name = 'John "Doe"'
    const result = gql`query { user(name: ${name}) }`
    expect(result).toEqual('query { user(name: John "Doe") }')
  })

  it('should handle undefined and null variables', () => {
    const name = undefined
    const age = null
    const result = gql`query { user(name: ${name}, age: ${age}) }`
    expect(result).toEqual('query { user(name: , age: ) }')
  })

  it('should handle variables that are objects or arrays', () => {
    const obj = { name: 'John', age: 30 }
    const arr = [1, 2, 3]
    const result = gql`query { user(data: ${obj}, numbers: ${arr}) }`
    expect(result).toEqual('query { user(data: [object Object], numbers: 1,2,3) }')
  })
})
