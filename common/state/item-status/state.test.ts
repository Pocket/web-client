// Test Setup
import { act, renderHook } from '@testing-library/react'

// Config
import { server } from '@config/jest/setup/server'
import { HttpResponse, http } from 'msw'

// Component
import { useItemStatus } from './'

const API_URL = 'some.api.url'
const id = '123abc'

describe('useItemStatus', () => {
  it('starts an empty follow ids array', () => {
    const { result } = renderHook(() => useItemStatus())
    expect(result.current.statusIds).toEqual([])
  })
})

describe('useItemStatus — adding a Status', () => {
  it('adds an id to the status ids with a positive server response', async () => {
    server.use(
      http.put(`${API_URL}/item-status`, async () => {
        return HttpResponse.json({ id, following: true }, { status: 200 })
      })
    )

    const { result } = renderHook(() => useItemStatus())
    expect(result.current.statusIds).toEqual([])

    await act(() => result.current.addStatus(id))
    expect(result.current.statusIds).toEqual([id])
  })

  it('falls back to prior state on bad response', async () => {
    server.use(
      http.put(`${API_URL}/item-status`, async () => {
        return HttpResponse.error()
      })
    )

    const { result } = renderHook(() => useItemStatus())
    expect(result.current.statusIds).toEqual([])

    await act(() => result.current.addStatus(id))
    expect(result.current.statusIds).toEqual([])
  })
})

describe('useItemStatus — removing a follow', () => {
  it('removes Status state if response is good', async () => {
    server.use(
      http.delete(`${API_URL}/item-status`, async () => {
        return HttpResponse.json({}, { status: 200 })
      })
    )

    const { result } = renderHook(() => useItemStatus())

    await act(() => useItemStatus.setState({ statusIds: [id] }))
    expect(result.current.statusIds).toEqual([id])

    await act(() => result.current.removeStatus(id))
    expect(result.current.statusIds).toEqual([])
  })

  it('keeps Status state if response is bad', async () => {
    server.use(
      http.delete(`${API_URL}/item-status`, async () => {
        return HttpResponse.error()
      })
    )

    const { result } = renderHook(() => useItemStatus())

    await act(() => useItemStatus.setState({ statusIds: [id] }))
    expect(result.current.statusIds).toEqual([id])

    await act(() => result.current.removeStatus(id))
    expect(result.current.statusIds).toEqual([id])
  })
})
