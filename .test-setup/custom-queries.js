import { queryHelpers, buildQueries } from '@testing-library/react'

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByCy = (...args) => queryHelpers.queryAllByAttribute('data-cy', ...args)

const getMultipleError = (c, dataCyValue) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`
const getMissingError = (c, dataCyValue) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`

const [queryByCy, getAllByCy, getByCy, findAllByCy, findByCy] = buildQueries(
  queryAllByCy,
  getMultipleError,
  getMissingError
)

export { queryByCy, queryAllByCy, getByCy, getAllByCy, findAllByCy, findByCy }
