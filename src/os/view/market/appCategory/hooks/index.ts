import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'os/store'

export const useAppCategory = ({
  category = '',
}: {
  category?: string | null
}) => {
  const { register } = useSelector((state: RootState) => state.page)
  const [title, setTitle] = useState('')
  const [appIds, setAppIds] = useState<AppIds>([])

  const fetchTitle = useCallback(async () => {
    //TODO: fetch category title
    if (!category) return 'UNKNOWN'
    let title = category.replace(/\W/, ' ')
    title = title.charAt(0).toUpperCase() + title.slice(1)
    setTitle(title)
  }, [category])

  const fetchApps = useCallback(async () => {
    if (!category) return setAppIds([])
    let appIds: AppIds = []
    for (const appId in register) {
      const tags = register[appId]?.tags
      if (tags?.includes(category)) appIds.push(appId)
      if (!tags && category === 'other') appIds.push(appId)
    }
    setAppIds(appIds)
  }, [category, register])

  useEffect(() => {
    fetchTitle()
    fetchApps()
  }, [fetchApps, fetchTitle])

  return {
    title,
    appIds,
  }
}
