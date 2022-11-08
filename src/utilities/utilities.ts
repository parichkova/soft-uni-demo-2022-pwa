import { mockarooBaseUrl, mockarooKey } from './constants'

export const getMockarooUrl = (path: string) =>
  `${mockarooBaseUrl}${path}.json?key=${mockarooKey}`
