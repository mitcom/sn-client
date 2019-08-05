import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../context'
import { useRepository } from './use-repository'
import { usePersonalSettings } from './use-personal-settings'

export const useStringReplace = (content: string) => {
  const [replacedContent, setReplacedContent] = useState('')
  const session = useContext(SessionContext)
  const repo = useRepository()
  const personalSettings = usePersonalSettings()

  useEffect(() => {
    const currentRepo = personalSettings.repositories.find(r => r.url === repo.configuration.repositoryUrl)

    const newReplacedContent = content
      .replace(
        '{currentUserName}',
        session.currentUser.FullName || session.currentUser.DisplayName || session.currentUser.Name,
      )
      .replace(
        '{currentRepositoryName}',
        currentRepo && currentRepo.displayName
          ? currentRepo.displayName
          : repo.configuration.repositoryUrl || repo.configuration.repositoryUrl,
      )
      .replace('{currentRepositoryUrl}', repo.configuration.repositoryUrl)

    setReplacedContent(newReplacedContent)
  }, [
    personalSettings.repositories,
    content,
    repo.configuration.repositoryUrl,
    session.currentUser.DisplayName,
    session.currentUser.FullName,
    session.currentUser.Name,
  ])

  return replacedContent
}