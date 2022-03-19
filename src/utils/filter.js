import service from '../utils/service'
import dayjs from 'dayjs'

function rankedFilter (item, form) {
  return form.rankedType === 'All' ||
    (item.ranked ? form.rankedType === 'Ranked' : form.rankedType === 'UnRanked')
}

function fullComboFilter (item, form) {
  return form.fullComboType === 'All' ||
    (item.fullCombo ? form.fullComboType === 'FullCombo' : form.fullComboType === 'UnFullCombo')
}

function dateFilter (item, form) {
  if (!form.date.enable || form.date?.value?.length < 2) {
    return true
  }
  const dateMin = dayjs(form.date.value[0]).startOf('day')
  const dateMax = dayjs(form.date.value[1]).endOf('day')
  return item.timeSet >= dateMin && item.timeSet <= dateMax
}

async function accFilter (item, form) {
  item.acc = await service.getAcc(item)

  if (!form.acc.enable || form.acc?.value?.length < 2) {
    return true
  }

  const accMin = form.acc.value[0]
  const accMax = form.acc.value[1]
  return item.acc >= accMin && item.acc <= accMax
}

function rankFilter (item, form) {
  if (!form.rank.enable || form.rank?.value?.length < 2) {
    return true
  }
  const rankMin = form.rank.value[0]
  const rankMax = form.rank.value[1]
  return item.rank >= rankMin && (item.rank <= rankMax || rankMax === 300)
}
function ppFilter (item, form) {
  if (form.rankedType === 'UnRanked' || !form.pp.enable || form.pp?.value?.length < 2) {
    return true
  }
  const ppMin = form.pp.value[0]
  const ppMax = form.pp.value[1]
  return item.pp >= ppMin && (item.pp <= ppMax || ppMax === 600)
}
function starsFilter (item, form) {
  if (form.rankedType === 'UnRanked' || !form.stars.enable || form.stars?.value?.length < 2) {
    return true
  }
  const starsMin = form.stars.value[0]
  const starsMax = form.stars.value[1]
  return item.stars >= starsMin && item.stars <= starsMax
}

function pkFilter (item, form, competitorMap) {
  if (!form.competitor.enable || !form.competitor.id) {
    return true
  }

  const competitorScore = competitorMap.get(item.id)

  if (!competitorScore) {
    return false
  }

  item.competitorAcc = (item.acc !== undefined && item.acc > 0) ? competitorScore / item.maxScore * 100 : undefined

  if (form.competitor.type === 'All') {
    return true
  }

  return form.competitor.type === 'Lower' ? item.baseScore <= competitorScore : item.baseScore >= competitorScore
}

export default {
  async dataFilter (item, form, competitorMap) {
    return rankedFilter(item, form) &&
      fullComboFilter(item, form) &&
      dateFilter(item, form) &&
      rankFilter(item, form) &&
      ppFilter(item, form) &&
      starsFilter(item, form) &&
      (await accFilter(item, form)) &&
      pkFilter(item, form, competitorMap)
  }
}
