import { DJ, Mixtape } from "@/types/mixtape";

export const djs: Record<string, DJ> = {
  emma: {
    code: "emma",
    name: "DJ Emma",
    link: "/i/deejay-emma",
  },
  banx: {
    code: "banx",
    name: "DJ Banx",
  },
  starcent: {
    code: "starcent",
    name: "Starcent DJ",
  },
  natij: {
    code: "natij",
    name: "DJ Nati J",
  },
  stinger: {
    code: "stinger",
    name: "DJ Stinger",
    link: "/i/deejay-stinger",
  },
  modern: {
    code: "modern",
    name: "DJ Modern",
  },
  gel: {
    code: "gel",
    name: "TEST",
  },
};

export const mixtapes: Mixtape[] = [
  {
    id: 1739941200,
    title: "DJ Emma Vol 1",
    url: "https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-dj-emma-vol-1-2025-02-19.mp3",
    dj: djs.emma,
  },
  {
    id: 1740545820,
    title: "DJ Banx Vol 1",
    url: "https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Banx-Vol-1.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-dj-banx-vol-1-2025-02-26.mp3",
    dj: djs.banx,
  },
  {
    id: 1741153985,
    title: "Starcent DJ Vol 1",
    url: "https://croozefm.com/wp-content/uploads/2025/03/Crooze-FM-Weekly-Mixtapes-Starcent-DJ-Vol-1.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-starcent-dj-vol-1-2025-03-05.mp3",
    dj: djs.starcent,
  },
  {
    id: 1741757450,
    title: "DJ Nati J Vol 1",
    url: "https://croozefm.com/wp-content/uploads/2025/03/CroozeFM-Mixtape-DJNatiJ-1.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-dj-nati-j-vol-1-2025-03-12.mp3",
    dj: djs.natij,
  },
  {
    id: 1742362219,
    title: "DJ Stinger Vol 1",
    url: "https://croozefm.com/wp-content/uploads/2025/03/Crooze-FM-Weekly-Mixtapes-DJ-Stinger-19th-March-2025.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-dj-stinger-vol-1-2025-03-19.mp3",
    dj: djs.stinger,
  },
  {
    id: 1742967019,
    title: "DJ Modern Vol 1",
    url: "https://croozefm.com/wp-content/uploads/2025/03/Crooze-FM-Mixtapes-DJ-Modern-26th-March-2025.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-dj-modern-vol-1-2025-03-26.mp3",
    dj: djs.modern,
  },
  {
    id: 1743625087,
    title: "Starcent DJ Vol 2",
    url: "https://croozefm.com/wp-content/uploads/2025/04/CroozeFM-WeeklyMixtapes-2ndApril2025.mp3",
    d_url:
      "https://storage.googleapis.com/cfm-weekly-mixtapes-2025/cfm-weekly-mixtape-starcent-dj-vol-2-2025-04-02.mp3",
    dj: djs.starcent,
  },
];
