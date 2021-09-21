export async function loadPolyfills() {
  if (window) {
    // Intersection observer polly fill
    if (typeof window.IntersectionObserver === 'undefined') {
      console.info('Loading Intersection Observer')
      await import('intersection-observer')
    }
  }
}
