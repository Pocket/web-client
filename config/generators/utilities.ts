export function validateFilename(input: string) {
  if (input.includes('.')) {
    return 'name cannot include an extension'
  }
  if (input.includes('_')) {
    return 'name cannot include underscores'
  }
  if (!input) {
    return 'name is required'
  }
  return true
}
