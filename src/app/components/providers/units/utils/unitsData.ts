export interface Unit {
  id: string;
  imageUrl: string;
  link: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive";
  size: "sm" | "md" | "lg";
}

export const units: Unit[] = [
  {
    id: "unit001",
    imageUrl: "https://transaudio.geltaverse.com/units/transaudio-unit-sm.png",
    link: "https://transaudio.geltaverse.com",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    size: "sm",
  },
  {
    id: "unit002",
    imageUrl: "https://transaudio.geltaverse.com/units/transaudio-unit-md.png",
    link: "https://transaudio.geltaverse.com",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    size: "md",
  },
  {
    id: "unit003",
    imageUrl: "https://transaudio.geltaverse.com/units/transaudio-unit-lg.png",
    link: "https://transaudio.geltaverse.com",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    size: "lg",
  },
];

export const getActiveUnits = (size: Unit["size"]): Unit[] => {
  const now = new Date().toISOString();
  return units.filter(
    (unit) =>
      unit.size === size &&
      unit.status === "active" &&
      now >= unit.startDate &&
      now <= unit.endDate
  );
};

export const getRandomUnit = (size: Unit["size"]): Unit | null => {
  const activeUnits = getActiveUnits(size);
  return activeUnits.length > 0
    ? activeUnits[Math.floor(Math.random() * activeUnits.length)]
    : null;
};
