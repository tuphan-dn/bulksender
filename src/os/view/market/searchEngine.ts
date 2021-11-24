import { Document } from 'flexsearch'

const PRESET = {
  tokenize: 'full',
  context: true,
  minlength: 3,
}

type SearchResult = {
  result: string[]
}

class SearchEngine {
  register: SenReg
  index: typeof Document

  constructor(register: SenReg) {
    this.register = register
    this.index = new Document({
      document: {
        id: 'appId',
        index: [
          { field: 'appId', ...PRESET },
          { field: 'name', ...PRESET },
          { field: 'description', ...PRESET },
          { field: 'author:name', ...PRESET },
          { field: 'author:email', ...PRESET },
        ],
      },
    })
    Object.keys(register).forEach((appId: string) =>
      this.add(appId, register[appId]),
    )
  }

  add = (id: string, doc: any) => {
    return this.index.add(id, doc)
  }

  search = (text: string, limit = 10) => {
    let raw: SearchResult[] = []
    text.split(',').forEach((word) => {
      raw = raw.concat(this.index.search(word, limit))
    })
    let appIds: string[] = []
    raw.forEach(({ result }) => {
      return result.forEach((appId: string) => {
        if (!appIds.includes(appId)) return appIds.push(appId)
      })
    })
    return appIds.map(
      (appId) => (this.register[appId] as ComponentManifest).appId,
    )
  }
}

export default SearchEngine
