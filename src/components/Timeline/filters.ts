import { IArticle } from '@/types';
import { Period } from './types';
import moment from 'moment';

const filterByPeriod = (period: Period, articles: IArticle[]): IArticle[] => {
  if (period === 'Today') {
    return articles.filter(
      x => x.created.isSameOrAfter(moment().subtract(1, 'days'))
    )
  }

  if (period === 'This Week') {
    return articles.filter(
      x => x.created.isSameOrAfter(moment().subtract(7, 'days'))
    )
  }

  if (period === 'This Month') {
    return articles.filter(
      x => x.created.isSameOrAfter(moment().subtract(1, 'month'))
    )
  }

  throw Error(`Period ${period} is not valid`)
}

export { filterByPeriod } 