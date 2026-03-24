export type AssetType = "hisse" | "altin" | "doviz"

export type AssetRow = {
  id: string
  user_id: string
  asset_type: AssetType
  symbol: string
  quantity: number
  buy_price: number
  daily_change_percent: number
  created_at: string
}

export type AssetWithMetrics = AssetRow & {
  current_price: number
  total_cost: number
  total_current_value: number
  pnl_amount: number
  pnl_percent: number
}
