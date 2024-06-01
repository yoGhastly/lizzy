import { DM_Sans, Instrument_Serif } from "next/font/google";

export const InstrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

export const DMSans = DM_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});
