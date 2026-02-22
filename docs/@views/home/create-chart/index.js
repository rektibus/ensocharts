import { init } from 'ensocharts'

const chart = init('k-line-chart')

chart.createIndicator(
  'MA',
  false,
  { id: 'candle_pane' }
)
chart.createIndicator('VOL')
chart.setSymbol({ ticker: 'TestSymbol' })
chart.setPeriod({ span: 1, type: 'day' })
chart.setDataLoader({
  getBars: ({
    callback
  }) => {
    fetch('https://ensocharts.com/datas/kline.json')
      .then(res => res.json())
      .then(dataList => {
        callback(dataList)
      })
  }
})
