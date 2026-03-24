import { updateModeAction } from "@/app/actions/mode"

type ModeSwitcherProps = {
  activeMode: "investor" | "normal"
}

const getButtonClass = (isActive: boolean, activeMode: "investor" | "normal") =>
  isActive
    ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900"
    : `rounded-lg px-3 py-2 text-sm font-medium transition ${activeMode === "investor" ? "bg-slate-800 text-slate-200 hover:bg-slate-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`

export const ModeSwitcher = ({ activeMode }: ModeSwitcherProps) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl p-2 ${activeMode === "investor" ? "border border-slate-700 bg-slate-900" : "border border-slate-300 bg-white"}`}
    >
      <form action={updateModeAction}>
        <input type="hidden" name="mode" value="normal" />
        <input type="hidden" name="redirectTo" value="/dashboard" />
        <button type="submit" className={getButtonClass(activeMode === "normal", activeMode)}>
          Günlük Mod
        </button>
      </form>

      <form action={updateModeAction}>
        <input type="hidden" name="mode" value="investor" />
        <input type="hidden" name="redirectTo" value="/dashboard" />
        <button type="submit" className={getButtonClass(activeMode === "investor", activeMode)}>
          Yatırımcı Modu
        </button>
      </form>
    </div>
  )
}
