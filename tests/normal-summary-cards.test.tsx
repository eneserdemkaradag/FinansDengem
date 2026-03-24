import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { NormalSummaryCards } from "@/app/components/normal-summary-cards"

describe("NormalSummaryCards", () => {
  it("renders budget summary labels and values", () => {
    render(<NormalSummaryCards totalIncome={10000} totalExpenses={3500} remainingBudget={6500} />)

    expect(screen.getByText("Toplam Gelir")).toBeInTheDocument()
    expect(screen.getByText("Toplam Harcama")).toBeInTheDocument()
    expect(screen.getByText("Kalan Butce")).toBeInTheDocument()
    expect(screen.getByText(/₺10\.000,00/)).toBeInTheDocument()
  })
})
