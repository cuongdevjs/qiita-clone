import moment from 'moment'

import { post } from '@/resources/factories'
import { filterByPeriod } from '../filters'

const posts = [
  { ...post, created: moment() },
  { ...post, created: moment().subtract(5, 'days') },
  { ...post, created: moment().subtract(28, 'days') },
]

describe('filterByPeriod', () => {
  it('filters posts published in the last day', () => {
    const actual = filterByPeriod('Today', posts)

    expect(actual).toEqual([ posts[0] ])
  })

  it('filters posts published in the last week', () => {
    const actual = filterByPeriod('This Week', posts)

    expect(actual).toEqual([ posts[0], posts[1] ])
  })

  it('filters posts published in the last month', () => {
    const actual = filterByPeriod('This Month', posts)

    expect(actual).toEqual(posts)
  })
})