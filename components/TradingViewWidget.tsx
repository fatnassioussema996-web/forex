// components/TradingViewWidget.tsx - TradingView widget placeholder

'use client'

import { useTranslations } from 'next-intl'

export function TradingViewWidget() {
  const t = useTranslations('home.marketSnapshot')

  return (
    <div className="w-full h-[400px] rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="text-sm text-slate-400">{t('widgetHint')}</div>
        <div className="text-xs text-slate-500">{t('chartHint')}</div>
        {/* TODO: Replace with actual TradingView widget when available */}
        {/* Example integration:
        <div id="tradingview_widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          new TradingView.widget({
            "autosize": true,
            "symbol": "BINANCE:BTCUSDT",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#1e293b",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": false,
            "save_image": false,
            "container_id": "tradingview_widget"
          });
        </script>
        */}
      </div>
    </div>
  )
}

