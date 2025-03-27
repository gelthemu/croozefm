import { Anchor, News } from "@/types/news";

const anchors: Record<string, Anchor> = {
  dithan: {
    name: "Dithan Ngabirano",
    img: "/assets/avatars/dithan.png",
  },
  dorothy: {
    name: "Dorothy Kainembabazi",
    img: "/assets/avatars/dorothy.png",
  },
  monica: {
    name: "Monica Mbabazi",
    link: "/i/monique-mbabazi",
    img: "https://pbs.twimg.com/profile_images/1898430237882425344/5oTDYkNS_400x400.jpg",
  },
  antoinette: {
    name: "Marie Antoinettie",
    img: "/assets/avatars/antoinette.png",
  },
  oscar: {
    name: "Oscar Abangira",
    img: "/assets/avatars/oscar.png",
  },
};

export const news: News[] = [
  // = = = = = = = = = = = = = = = = = = = 8AM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202411190800,
    aired: {
      date: "2024-11-19T08:00:00+03:00",
      time: "8AM",
    },
    headline:
      "President Museveni begins a tour in Teso to promote wealth creation initiatives",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-19_8am",
  },
  {
    id: 202411200800,
    aired: {
      date: "2024-11-20T08:00:00+03:00",
      time: "8AM",
    },
    headline:
      "Mbarara Leaders Express Concern Over Domestic Violence Linked to Land Disputes",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-20_8am",
  },
  {
    id: 202411210800,
    aired: {
      date: "2024-11-21T08:00:00+03:00",
      time: "8AM",
    },
    headline:
      "Dr. Kizza Besigye and Hajji Lutale Detained for Alleged Arms and Ammunition Possession",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-21_8am",
  },
  {
    id: 202412030800,
    aired: {
      date: "2024-12-03T08:00:00+03:00",
      time: "8AM",
    },
    headline:
      "New Lower Curriculum Textbooks Distributed to 25 Secondary Schools in Kitagwenda",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-12-03_8am",
  },
  {
    id: 202412110800,
    aired: {
      date: "2024-12-11T08:00:00+03:00",
      time: "8AM",
    },
    headline:
      "Kenya's Law Society Threatens to Halt Admissions of Ugandan Lawyers",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-12-11_8am",
  },
  {
    id: 202502050800,
    aired: {
      date: "2025-02-05T08:00:00+03:00",
      time: "8AM",
    },
    headline:
      "Nine Arrested in Connection with Bank of Uganda Heist Involving Billions in Shillings",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-02-05_8am",
  },
  // = = = = = = = = = = = = = = = = = = = 10AM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202411211000,
    aired: {
      date: "2024-11-21T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "Health Minister Aceng cautions that condoms do not offer protection against Mpox in Uganda",
    anchor: anchors.dorothy,
    audio: "cfm-news-2024-11-21_10am",
  },
  {
    id: 202501291000,
    aired: {
      date: "2025-01-29T10:00:00+03:00",
      time: "10AM",
    },
    headline: "Uganda Airlines Suspends Service to Kinshasa",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-01-29_10am",
  },
  {
    id: 202501281000,
    aired: {
      date: "2025-01-28T10:00:00+03:00",
      time: "10AM",
    },
    headline: "American Tourist Killed in Nasty Road Accident in Kanungu",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-01-28_10am",
  },
  {
    id: 202501131000,
    aired: {
      date: "2025-01-13T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "Mbarara Grapples with Escalating Crisis of Abandoned Children; Highlighting Urgent Social and Economic Issues",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-01-13_10am",
  },
  {
    id: 202412161000,
    aired: {
      date: "2024-12-16T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "President Museveni Announces Government Scrutiny of Healing Claims by Pastors and Religious Leaders",
    anchor: anchors.dorothy,
    audio: "cfm-news-2024-12-16_10am",
  },
  {
    id: 202412051000,
    aired: {
      date: "2024-12-05T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "South Korean Police Probe President Yoon for Alleged Insurrection",
    anchor: anchors.dorothy,
    audio: "cfm-news-2024-12-05_10am",
  },
  {
    id: 202502051000,
    aired: {
      date: "2025-02-05T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "20% of Candidates who Passed 2024 PLE Exams Stranded as Secondary School Admission Falls Short",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-02-05_10am",
  },
  {
    id: 202502131000,
    aired: {
      date: "2025-02-13T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "Voters Alarmed as Electoral Commission Removes Polling Stations in Masaka",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-02-13_10am",
  },
  {
    id: 202502201000,
    aired: {
      date: "2025-02-20T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "Public University Employees Launch Strike Due to Postponed Salary Increases",
    anchor: anchors.antoinette,
    audio: "cfm-news-2025-02-20_10am",
  },
  {
    id: 202502241000,
    aired: {
      date: "2025-02-24T10:00:00+03:00",
      time: "10AM",
    },
    headline:
      "NUP Weighs Legal Challenge Against Security Forces Following Raid",
    anchor: anchors.antoinette,
    audio: "cfm-news-2025-02-24_10am",
  },
  // = = = = = = = = = = = = = = = = = = = 11AM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202502221100,
    aired: {
      date: "2025-02-22T11:00:00+03:00",
      time: "11AM",
    },
    headline:
      "East African Court Set to Adjudicate Case on East African Crude Oil Pipeline (EACOP)",
    anchor: anchors.antoinette,
    audio: "cfm-news-2025-02-22_11am",
  },
  {
    id: 202503221100,
    aired: {
      date: "2025-03-22T11:00:00+03:00",
      time: "11AM",
    },
    headline:
      "Ibanda RDC Demands Action Against Wetland Encroachment; Sudan’s Army Captures Central Bank Headquarters in Khartoum",
    anchor: anchors.antoinette,
    audio: "cfm-news-2025-03-22_11am",
  },
  // = = = = = = = = = = = = = = = = = = = 1PM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202411191300,
    aired: {
      date: "2024-11-19T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "On the Anniversary of the November riots, Families are Demanding Justice",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-19_1pm",
  },
  {
    id: 202411251300,
    aired: {
      date: "2024-11-25T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "Police scattered fans of Alien Skin who were assembled outside Makindye Court",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-25_1pm",
  },
  {
    id: 202501131300,
    aired: {
      date: "2025-01-13T13:00:00+03:00",
      time: "1PM",
    },
    headline: "NWSC urges relevant officials to act to protect River Rwiizi",
    anchor: anchors.dithan,
    audio: "cfm-news-2025-01-13_1pm",
  },
  {
    id: 202501301300,
    aired: {
      date: "2025-01-30T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "Tragic Mid-Air Collision Over Washington: American Airlines Jet and Military Helicopter Crash into Potomac",
    anchor: anchors.dithan,
    audio: "cfm-news-2025-01-30_1pm",
  },
  {
    id: 202502051300,
    aired: {
      date: "2025-02-05T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "Kidney Patients at Mulago Hospital Voice Concerns Over Inadequate Nighttime Medical Services",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-02-05_1pm",
  },
  {
    id: 202502211300,
    aired: {
      date: "2025-02-21T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "Mbarara Councilors Probe 1.2 Billion UGX Debt in Road Project Standoff Between MBJ Technologies and Multiplex",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-02-21_1pm",
  },
  {
    id: 202502241300,
    aired: {
      date: "2025-02-24T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "Kasese Deputy RDC Detains Another Individual for Misusing PDM Funds",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-02-24_1pm",
  },
  {
    id: 202503271300,
    aired: {
      date: "2025-03-27T13:00:00+03:00",
      time: "1PM",
    },
    headline:
      "Government Explains Current Power Outages; Niger Coup Leader Sworn In As President",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-03-27_1pm",
  },
  // = = = = = = = = = = = = = = = = = = = 2PM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202411191400,
    aired: {
      date: "2024-11-19T14:00:00+03:00",
      time: "2PM",
    },
    headline: "UCDA Still Fully Operational Until New Bill is Signed into Law",
    anchor: anchors.dorothy,
    audio: "cfm-news-2024-11-19_2pm",
  },
  {
    id: 202411251400,
    aired: {
      date: "2024-11-25T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "The elevated price of molasses has impacted local waragi vendors in Busoga",
    anchor: anchors.dorothy,
    audio: "cfm-news-2024-11-25_2pm",
  },
  {
    id: 202412101400,
    aired: {
      date: "2024-12-10T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "China Initiates Probe into Nvidia Following U.S. Export Control Announcements, Alleging Antimonopoly Law Violations",
    anchor: anchors.dorothy,
    audio: "cfm-news-2024-12-10_2pm",
  },
  {
    id: 202501301400,
    aired: {
      date: "2025-01-30T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Uganda's Exports Largely Dependent on Middle East, Now Top Destination for Goods, Says Finance Ministry Report",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-01-30_2pm",
  },
  {
    id: 202501231400,
    aired: {
      date: "2025-01-23T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Church of Uganda Engages Inspire Africa Group to Enhance Coffee Cultivation and Value Addition",
    anchor: anchors.dorothy,
    audio: "cfm-news-2025-01-23_2pm",
  },
  {
    id: 202502171400,
    aired: {
      date: "2025-02-17T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Uganda National Lottery Marks Seven Months of Growth, Introduces Digital Ticketing",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-17_2pm",
  },
  {
    id: 202502181400,
    aired: {
      date: "2025-02-18T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Coffee Theft Crisis Sparks Unified Action at Bufunda Community Baraza",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-18_2pm",
  },
  {
    id: 202502241400,
    aired: {
      date: "2025-02-24T14:00:00+03:00",
      time: "2PM",
    },
    headline: "Trade war uncertainty may impact Uganda's 2025 economic growth",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-24_2pm",
  },
  {
    id: 202503021400,
    aired: {
      date: "2025-03-02T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Kabarole Residents Urge Action on Neglect of Children with Disabilities",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-03-02_2pm",
  },
  {
    id: 202502261400,
    aired: {
      date: "2025-02-26T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Bunyoro Business Leaders Urge Review of East African Community Trade Restrictions",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-26_2pm",
  },
  {
    id: 202503161400,
    aired: {
      date: "2025-03-16T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Ibanda Municipality Launches Town Beautification Project to Boost Growth and Livelihoods; Minister Musasizi Promotes Skills-Based Education",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-03-16_2pm",
  },
  {
    id: 202503191400,
    aired: {
      date: "2025-03-19T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "Farmers in Kasese Face Severe Losses as Elephants Invade Crops; Over 500 Umeme Employees to Lose Jobs as UEDCL Takes Over Power Supply",
    anchor: anchors.monica,
    audio: "cfm-news-2025-03-19_2pm",
  },
  {
    id: 202503271400,
    aired: {
      date: "2025-03-27T14:00:00+03:00",
      time: "2PM",
    },
    headline:
      "East African Crude Oil Pipeline Secures Major Funding from Top African Banks; Tanzania Imposes New Taxes on Kenyan Exports, Sparking Trade Tension Fears; Trump Open to Reducing China Tariffs to Secure TikTok Sale Deal",
    anchor: anchors.monica,
    audio: "cfm-news-2025-03-27_2pm",
  },
  // = = = = = = = = = = = = = = = = = = = 4PM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202503181600,
    aired: {
      date: "2025-03-18T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "International Criminal Court Rejects Request to Hear Kony Case in Uganda; Kisoro DHO Urges Pregnant Women to Seek Timely Checkups to Prevent Premature Deaths; Israel Strikes Gaza, Leaving Over 400 Dead as Ceasefire Collapses",
    anchor: anchors.monica,
    audio: "cfm-news-2025-03-18_4pm",
  },
  {
    id: 202411141600,
    aired: {
      date: "2024-11-14T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Nutrition Experts in Uganda Introduce App to Combat False Information",
    anchor: anchors.monica,
    audio: "cfm-news-2024-11-14_4pm",
  },
  {
    id: 202411181600,
    aired: {
      date: "2024-11-18T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Concern Rises as Mbarara Hospital Reports 100 Premature Babies Born Each Month",
    anchor: anchors.monica,
    audio: "cfm-news-2024-11-18_4pm",
  },
  {
    id: 202411191600,
    aired: {
      date: "2024-11-19T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Markhan Singh landlords plan to build a 40 billion shilling market in Mbarara",
    anchor: anchors.monica,
    audio: "cfm-news-2024-11-19_4pm",
  },
  {
    id: 202411211600,
    aired: {
      date: "2024-11-21T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "According to a police report, 32 people died in accidents involving boda bodas last week",
    anchor: anchors.antoinette,
    audio: "cfm-news-2024-11-21_4pm",
  },
  {
    id: 202411251600,
    aired: {
      date: "2024-11-25T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Mbarara City has entered into an MOU with the UPDF to repair the Katete Bridge",
    anchor: anchors.monica,
    audio: "cfm-news-2024-11-25_4pm",
  },
  {
    id: 202501131600,
    aired: {
      date: "2025-01-13T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Court Martial Adds Treachery Charges to Besigye and Co-Accused in Today's Hearing",
    anchor: anchors.monica,
    audio: "cfm-news-2025-01-13_4pm",
  },
  {
    id: 202412131600,
    aired: {
      date: "2024-12-13T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Mysterious 'Dancing Disease' in Bundibugyo Causes Uncontrollable Shaking, Fever, and Paralysis in Hundreds",
    anchor: anchors.antoinette,
    audio: "cfm-news-2024-12-13_4pm",
  },
  {
    id: 202502031600,
    aired: {
      date: "2025-02-03T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Low Turnout in Mbarara UPE Schools as Parents Struggle with School Requirements",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-03_4pm",
  },
  {
    id: 202502171600,
    aired: {
      date: "2025-02-17T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Bushenyi Protesters Demand Besigye's Release Amid Health Concerns",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-17_4pm",
  },
  {
    id: 202502211600,
    aired: {
      date: "2025-02-21T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Besigye Ends Hunger Strike Following Transfer of Case to Civilian Court",
    anchor: anchors.monica,
    audio: "cfm-news-2025-02-21_4pm",
  },
  {
    id: 202503121600,
    aired: {
      date: "2025-03-12T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "Mbarara Business Owners Threaten Protests Over Power Outages; Museveni Summons NRM MPs for Urgent State House Meeting",
    anchor: anchors.monica,
    audio: "cfm-news-2025-03-12_4pm",
  },
  {
    id: 202503141600,
    aired: {
      date: "2025-03-14T16:00:00+03:00",
      time: "4PM",
    },
    headline:
      "UACE Performance Drops as Candidates Increase; US and Israel Plan to Move Gaza Palestinians to Africa",
    anchor: anchors.monica,
    audio: "cfm-news-2025-03-14_4pm",
  },
  // = = = = = = = = = = = = = = = = = = = 7PM = = = = = = = = = = = = = = = = = = = = = =
  {
    id: 202411151900,
    aired: {
      date: "2024-11-15T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Uganda Set to Gain from UK Satellite Funding Aimed at Climate Surveillance",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-15_7pm",
  },
  {
    id: 202411191900,
    aired: {
      date: "2024-11-19T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "President Museveni officially opened the Skilling Hub in Soroti City",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-19_7pm",
  },
  {
    id: 202411211900,
    aired: {
      date: "2024-11-21T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Two arrested in Mitooma for the alleged murder of a 7-year-old girl and her mother",
    anchor: anchors.dithan,
    audio: "cfm-news-2024-11-21_7pm",
  },
  {
    id: 202501281900,
    aired: {
      date: "2025-01-28T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Two Individuals Suspected of Homosexuality and Human Trafficking Arrested in Kisoro",
    anchor: anchors.dithan,
    audio: "cfm-news-2025-01-28_7pm",
  },
  {
    id: 202501291900,
    aired: {
      date: "2025-01-29T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Opposition Pressures UBOS Regarding the 2024 National Population and Housing Census",
    anchor: anchors.dithan,
    audio: "cfm-news-2025-01-29_7pm",
  },
  {
    id: 202502171900,
    aired: {
      date: "2025-02-17T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Mbarara Emyooga SACCO Leaders Warned: Conduct Annual General Meetings or Face Funding Cuts",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-02-17_7pm",
  },
  {
    id: 202502181900,
    aired: {
      date: "2025-02-18T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Kizza Besigye Detention: President Museveni Digs in, and Accuses Besigye for Seeking Public Sympathy",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-02-18_7pm",
  },
  {
    id: 202503101900,
    aired: {
      date: "2025-03-10T19:00:00+03:00",
      time: "7PM",
    },
    headline:
      "Uganda Ministry of Health Launches 10-Day Nationwide Campaign to Reduce Maternal and Neonatal Mortality",
    anchor: anchors.oscar,
    audio: "cfm-news-2025-03-10_7pm",
  },
];
