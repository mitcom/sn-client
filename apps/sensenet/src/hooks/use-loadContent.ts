import { useCallback, useEffect, useState } from 'react'
import { GenericContent } from '@sensenet/default-content-types'
import { ODataParams } from '@sensenet/client-core'
import { useRepository } from '@sensenet/hooks-react'

type Options = {
  idOrPath: string | number
  oDataOptions?: ODataParams<GenericContent>
}

export const useLoadContent = <T extends GenericContent>({ idOrPath, oDataOptions }: Options) => {
  const [content, setContent] = useState<T>()
  const [error, setError] = useState<Error | undefined>()
  const [reloadToken, setReloadToken] = useState(1)
  const reload = useCallback(() => {
    setReloadToken(Math.random())
  }, [])
  const repo = useRepository()

  useEffect(() => {
    const ac = new AbortController()
    if (idOrPath) {
      ;(async () => {
        try {
          const response = await repo.load<T>({
            idOrPath,
            requestInit: { signal: ac.signal },
            oDataOptions,
          })
          setContent(response.d)
        } catch (err) {
          if (!ac.signal.aborted) {
            setError(err)
          }
        }
      })()
    }
    return () => ac.abort()
  }, [repo, idOrPath, reloadToken, oDataOptions])

  return { content, error, reload }
}