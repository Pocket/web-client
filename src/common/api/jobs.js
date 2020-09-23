import fetch from 'isomorphic-unfetch'
import { GREENHOUSE_JOBS_URL } from 'common/constants'

/**
 * Get jobs list from Greenhouse
 */
export async function getJobsList() {
  try {
    const response = await fetch(GREENHOUSE_JOBS_URL)
    const jobs = await response.json()
    return jobs
  } catch (error) {
    console.warn(error)
  }
}
