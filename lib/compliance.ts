export interface Jurisdiction {
  code: string;
  name: string;
  isBettingPermitted: boolean;
  minAge: number;
  licensingBody: string;
  disclaimer: string;
  helplines: { name: string; contact: string; url: string }[];
}

export const JURISDICTIONS: Record<string, Jurisdiction> = {
  UK: {
    code: "UK",
    name: "United Kingdom",
    isBettingPermitted: true,
    minAge: 18,
    licensingBody: "UK Gambling Commission (UKGC)",
    disclaimer: "18+ only. Betting involves financial risk and can become addictive. Only wager what you can afford to lose. Regulated under UKGC license.",
    helplines: [
      { name: "National Gambling Helpline (GamCare)", contact: "0808 8020 133", url: "https://www.gamcare.org.uk" },
      { name: "BeGambleAware", contact: "Live Chat 24/7", url: "https://www.begambleaware.org" }
    ]
  },
  EU: {
    code: "EU",
    name: "European Union (Regulated)",
    isBettingPermitted: true,
    minAge: 18,
    licensingBody: "Malta Gaming Authority (MGA) / National Regulators",
    disclaimer: "18+ only. Odds are subject to change. Please play responsibly and utilize deposit limit controls.",
    helplines: [
      { name: "European Responsible Gaming", contact: "Support Directory", url: "https://www.responsiblegambling.org" }
    ]
  },
  US_NJ: {
    code: "US_NJ",
    name: "United States (Regulated States - e.g. NJ/NY)",
    isBettingPermitted: true,
    minAge: 21,
    licensingBody: "State Gaming Enforcement Division",
    disclaimer: "21+ only. Gambling Problem? Call 1-800-GAMBLER. Available in licensed states only.",
    helplines: [
      { name: "National Problem Gambling Helpline", contact: "1-800-522-4700", url: "https://www.ncpgambling.org" },
      { name: "1-800-GAMBLER", contact: "1-800-426-2537", url: "https://www.800gambler.org" }
    ]
  },
  IND: {
    code: "IND",
    name: "India (Restricted Jurisdiction)",
    isBettingPermitted: false,
    minAge: 18,
    licensingBody: "Not Applicable",
    disclaimer: "Real-money sports wagering is restricted or prohibited in this jurisdiction. Real-time bookmaker odds are disabled in compliance with local regulations. Educational match outlook and statistical projections are displayed instead.",
    helplines: [
      { name: "Responsible Play Helpline", contact: "support@cricpulse.com", url: "/responsible-gambling" }
    ]
  },
  RESTRICTED_GLOBAL: {
    code: "RESTRICTED_GLOBAL",
    name: "Restricted Territory (Global)",
    isBettingPermitted: false,
    minAge: 18,
    licensingBody: "Not Applicable",
    disclaimer: "Betting functionality is unavailable in your current geographic region. Only verified match statistics and AI projections are accessible.",
    helplines: [
      { name: "Gambling Therapy International", contact: "24/7 Multilingual", url: "https://www.gamblingtherapy.org" }
    ]
  }
};
