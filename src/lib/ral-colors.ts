export interface RALColor {
  code: string
  name: string
  hex: string
}

export const RAL_COLORS: RALColor[] = [
  { code: "9016", name: "Verkeerswit", hex: "#F1F0EA" },
  { code: "9010", name: "Zuiver wit", hex: "#F5F4F0" },
  { code: "9003", name: "Signaalwit", hex: "#ECECE7" },
  { code: "9006", name: "Wit aluminium", hex: "#A5A5A5" },
  { code: "9007", name: "Grijs aluminium", hex: "#8F8F8C" },
  { code: "9005", name: "Gitzwart", hex: "#0A0A0A" },
  { code: "9004", name: "Signaalzwart", hex: "#1E1E1E" },
  { code: "7016", name: "Antraciet grijs", hex: "#383E42" },
  { code: "7021", name: "Zwartgrijs", hex: "#2F3234" },
  { code: "7035", name: "Lichtgrijs", hex: "#CBD0CC" },
  { code: "7037", name: "Stofgrijs", hex: "#7D7F7D" },
  { code: "7040", name: "Venstergijs", hex: "#9DA3A6" },
  { code: "7042", name: "Verkeersgrijs A", hex: "#8F9695" },
  { code: "5010", name: "Gentiaanblauw", hex: "#0E4C8A" },
  { code: "5002", name: "Ultramarijnblauw", hex: "#20214F" },
  { code: "5014", name: "Duifblauw", hex: "#6A7C99" },
  { code: "3000", name: "Vlammend rood", hex: "#AB2524" },
  { code: "3020", name: "Verkeersrood", hex: "#CC0605" },
  { code: "6005", name: "Mosgroen", hex: "#1B4C2A" },
  { code: "6009", name: "Dennegroen", hex: "#1C342D" },
  { code: "1018", name: "Zinkgeel", hex: "#F5D033" },
  { code: "8014", name: "Sepiabruin", hex: "#4E3B31" },
  { code: "8022", name: "Zwartbruin", hex: "#1A1718" },
]

export function ralToHex(code: string): string | null {
  const color = RAL_COLORS.find(c => c.code === code)
  return color ? color.hex : null
}

export function findRALByCode(code: string): RALColor | null {
  return RAL_COLORS.find(c => c.code === code) ?? null
}
