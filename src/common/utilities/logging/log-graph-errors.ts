export function graphErrorLog(graphErrors = []): void {
  if (process.env.NODE_ENV === 'production') return
  
  const parsedErrors = graphErrors.map((error) => {
    const message = error.message
    const code = error.extensions?.code

    return {
      message,
      code
    }
  })
  console.table(parsedErrors, ['code', 'message'])
}
