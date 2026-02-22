import { init } from 'ensocharts'

const chart = init(
  'init-zoomAnchor-chart',
  { zoomAnchor: { main: 'last_bar', xAxis: 'last_bar' } }
)

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
