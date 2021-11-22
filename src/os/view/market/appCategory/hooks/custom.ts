export type CategoryRelated = {
  appIds?: AppIds
}

export type CategoryFilter = {
  authorEmail?: string
}

export const findAppWithTag = (
  register: SenHubRegister,
  appIds: AppIds,
  tag: string,
): AppIds => {
  return appIds.filter((appId) => register[appId]?.tags?.includes(tag))
}

export const findAppOthers = (
  register: SenHubRegister,
  appIds: AppIds,
): AppIds => {
  return appIds.filter((appId) => !register[appId]?.tags)
}

export const findAppSuggest = (
  register: SenHubRegister,
  appIds: AppIds,
  related: CategoryRelated,
) => {
  if (!related.appIds) return []
  //Suggest by tag
  let tagsSuggest: string[] = []
  for (const appId of related.appIds) {
    const newTags = register[appId]?.tags || []
    tagsSuggest = Array.from(new Set([...tagsSuggest, ...newTags]))
  }
  return appIds.filter((appId) => {
    if (related.appIds?.includes(appId)) return false
    for (const tag of tagsSuggest)
      if (register[appId]?.tags?.includes(tag)) return true
    return false
  })
}

export const filterApp = (
  register: SenHubRegister,
  appIds: AppIds,
  { authorEmail }: CategoryFilter,
): AppIds => {
  return appIds.filter((appId) => {
    const { author } = register[appId] || {}
    return author?.email === authorEmail
  })
}
