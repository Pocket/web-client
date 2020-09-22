import fetch from 'isomorphic-unfetch'

// Greenhouse board id for Pocket org
const POCKET_BOARD_ID = 'pocketco'

/**
 * Get jobs list from Greenhouse
 */
export async function getJobsList() {
  try {
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${POCKET_BOARD_ID}/jobs`
    )
    const jobs = await response.json()
    return jobs
  } catch (error) {
    console.warn(error)
  }
}
