import { ref, type Ref } from 'vue'

export interface FetchOptions extends RequestInit {
  immediate?: boolean
}

export interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
  reset: () => void
}

export function useFetch<T>(
  url: string | (() => string),
  options: FetchOptions = {},
): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null) as Ref<Error | null>
  const loading = ref(false) as Ref<boolean>

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      const requestUrl = typeof url === 'function' ? url() : url
      const response = await fetch(requestUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data.value = await response.json()
      } else {
        data.value = (await response.text()) as T
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      data.value = null
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
  }

  // Execute immediately if immediate option is true (default behavior)
  if (options.immediate !== false) {
    execute()
  }

  return {
    data,
    error,
    loading,
    execute,
    reset,
  }
}
