import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'os/store'
import {
  CategoryFilter,
  CategoryRelated,
  filterApp,
  findAppOthers,
  findAppSuggest,
  findAppWithTag,
} from './custom'

export enum CustomCategory {
  others = 'others',
  suggest = 'suggest-for-you',
}

export type CategoryOptions = {
  category: string
  title?: string
  related?: CategoryRelated
  filter?: CategoryFilter
}

export const useAppCategory = ({
  category,
  related,
  filter,
  title,
}: CategoryOptions) => {
  const { register } = useSelector((state: RootState) => state.page)
  const [appIds, setAppIds] = useState<AppIds>([])

  const categoryTitle = useMemo(() => {
    if (title) return title
    return category.replace(/\W/g, ' ')
  }, [category, title])

  /**
   * find all app with CategoryData with case:
   * suggest-for-you: find all apps related to other apps
   * others: find all apps without tags
   * default: filter apps with tags
   */
  const findApps = useCallback(async () => {
    let appIds: AppIds = Object.keys(register)
    switch (category) {
      case CustomCategory.suggest:
        let suggestData = related || {}
        appIds = findAppSuggest(register, appIds, suggestData)
        break
      case CustomCategory.others:
        appIds = findAppOthers(register, appIds)
        break
      default:
        appIds = findAppWithTag(register, appIds, category)
        break
    }
    if (filter) appIds = filterApp(register, appIds, filter)
    setAppIds(appIds)
  }, [register, category, filter, related])

  useEffect(() => {
    findApps()
  }, [findApps])

  return {
    title: categoryTitle,
    appIds,
  }
}
