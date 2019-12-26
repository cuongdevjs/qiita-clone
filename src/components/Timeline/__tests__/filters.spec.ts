import moment from 'moment'

import { article } from '@/resources/factories'
import { filterByPeriod } from '../filters'

const articles = [
  { ...article, created: moment() },
  { ...article, created: moment().subtract(5, 'days') },
  { ...article, created: moment().subtract(28, 'days') },
]

describe('filterByPeriod', () => {
  it('filters articles published in the last day', () => {
    const actual = filterByPeriod('Today', articles)

    expect(actual).toEqual([ articles[0] ])
  })

  it('filters articles published in the last week', () => {
    const actual = filterByPeriod('This Week', articles)

    expect(actual).toEqual([ articles[0], articles[1] ])
  })

  it('filters articles published in the last month', () => {
    const actual = filterByPeriod('This Month', articles)

    expect(actual).toEqual(articles)
  })
})