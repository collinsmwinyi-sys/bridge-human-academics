export type StudyHumanService =
  | "Tutoring support"
  | "Editing and Proofreading"
  | "Research Guidance"
  | "Data Analysis Guidance"
  | "Formatting and Citations"
  | "Presentation Support"
  | "Survey Participant Recruitment"
  | "Writing Check";

export type AcademicLevel =
  | "High School"
  | "Diploma"
  | "Undergraduate"
  | "Master's"
  | "PhD";

export type Deadline =
  | "7+ Days"
  | "3-6 Days"
  | "24-48 Hours"
  | "Under 24 Hours";

export type QuantityType = "pages" | "hours" | "slides" | "participants";

export interface PriceEstimateInput {
  serviceType: StudyHumanService;
  academicLevel: AcademicLevel;
  deadline: Deadline;
  quantity: number;
  quantityType?: QuantityType;
  supportLevel?: "Standard" | "Advanced" | "Urgent Review";
}

export interface PriceEstimate {
  minPrice: number;
  maxPrice: number;
  currency: "USD";
  note: string;
}

const serviceBasePrices: Record<StudyHumanService, number> = {
  "Tutoring support": 10,
  "Editing and Proofreading": 6,
  "Research Guidance": 12,
  "Data Analysis Guidance": 15,
  "Formatting and Citations": 5,
  "Presentation Support": 8,
  "Survey Participant Recruitment": 0.75,
  "Writing Check": 6,
};

const academicLevelMultipliers: Record<AcademicLevel, number> = {
  "High School": 0.8,
  "Diploma": 0.9,
  "Undergraduate": 1,
  "Master's": 1.25,
  "PhD": 1.5,
};

const deadlineMultipliers: Record<Deadline, number> = {
  "7+ Days": 1,
  "3-6 Days": 1.2,
  "24-48 Hours": 1.5,
  "Under 24 Hours": 2,
};

const supportLevelMultipliers = {
  Standard: 1,
  Advanced: 1.25,
  "Urgent Review": 1.5,
};

export function calculateSupportEstimate(input: PriceEstimateInput): PriceEstimate {
  const safeQuantity = Math.max(1, Number(input.quantity) || 1);
  const basePrice = serviceBasePrices[input.serviceType] ?? 10;
  const academicMultiplier = academicLevelMultipliers[input.academicLevel] ?? 1;
  const deadlineMultiplier = deadlineMultipliers[input.deadline] ?? 1;
  const supportMultiplier =
    supportLevelMultipliers[input.supportLevel ?? "Standard"] ?? 1;

  const rawPrice =
    basePrice * safeQuantity * academicMultiplier * deadlineMultiplier * supportMultiplier;

  const minPrice = Math.max(5, Math.round(rawPrice));
  const maxPrice = Math.round(minPrice * 1.35);

  return {
    minPrice,
    maxPrice,
    currency: "USD",
    note: "This is an estimate. Final pricing is confirmed by a human helper after review.",
  };
}
