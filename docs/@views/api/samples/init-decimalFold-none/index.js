import { init } from 'ensocharts'

const chart = init(
  'init-decimalFold-none-chart',
  { decimalFold: { threshold: 1000 } }
)

chart.setSymbol({ ticker: 'TestSymbol', pricePrecision: 10 })
chart.setPeriod({ span: 1, type: 'day' })
chart.setDataLoader({
  getBars: ({
    callback
  }) => {
    fetch('https://ensocharts.com/datas/kline2.json')
      .then(res => res.json())
      .then(dataList => {
        callback(dataList)
      })
  }
})
