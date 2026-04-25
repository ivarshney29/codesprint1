import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   GOOGLE FONTS & GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #07101f;
      --surface: #0d1a30;
      --surface2: #122040;
      --border: #1b2e4d;
      --border2: #2a4470;
      --amber: #4f8cff;
      --amber-dim: #2563eb;
      --green: #4ade80;
      --red: #f87171;
      --blue: #60a5fa;
      --purple: #a78bfa;
      --text: #e8f1ff;
      --text2: #7a9bc4;
      --text3: #3d5a7a;
      --radius: 12px;
      --radius-sm: 8px;
      --shadow: 0 4px 24px rgba(0,0,40,0.5);
    }

    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

    .font-display { font-family: 'Syne', sans-serif; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
    }
    .card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: var(--shadow); }

    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 18px; border-radius: var(--radius-sm);
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      cursor: pointer; border: none; transition: all 0.15s; white-space: nowrap;
    }
    .btn-amber { background: var(--amber); color: #fff; }
    .btn-amber:hover { background: #3571e0; }
    .btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
    .btn-ghost:hover { border-color: var(--border2); color: var(--text); }
    .btn-danger { background: rgba(248,113,113,0.15); color: var(--red); border: 1px solid rgba(248,113,113,0.3); }
    .btn-danger:hover { background: rgba(248,113,113,0.25); }
    .btn-green { background: rgba(74,222,128,0.15); color: var(--green); border: 1px solid rgba(74,222,128,0.3); }
    .btn-green:hover { background: rgba(74,222,128,0.25); }
    .btn-sm { padding: 6px 12px; font-size: 13px; }

    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 500;
    }
    .badge-amber { background: rgba(79,140,255,0.15); color: var(--amber); border: 1px solid rgba(79,140,255,0.3); }
    .badge-green { background: rgba(74,222,128,0.12); color: var(--green); border: 1px solid rgba(74,222,128,0.25); }
    .badge-red { background: rgba(248,113,113,0.12); color: var(--red); border: 1px solid rgba(248,113,113,0.25); }
    .badge-blue { background: rgba(79,140,255,0.18); color: var(--blue); border: 1px solid rgba(96,165,250,0.25); }
    .badge-purple { background: rgba(167,139,250,0.12); color: var(--purple); border: 1px solid rgba(167,139,250,0.25); }
    .badge-gray { background: rgba(255,255,255,0.06); color: var(--text2); border: 1px solid var(--border); }

    .input {
      background: var(--surface2); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 9px 14px;
      color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
      width: 100%; outline: none; transition: border-color 0.15s;
    }
    .input:focus { border-color: var(--amber); }
    .input::placeholder { color: var(--text3); }

    select.input option { background: var(--surface2); }

    .label { font-size: 13px; color: var(--text2); margin-bottom: 6px; font-weight: 500; display: block; }

    .tag {
      display: inline-flex; align-items: center;
      padding: 4px 10px; border-radius: 99px;
      font-size: 12px; font-weight: 500;
      background: var(--surface2); color: var(--text2); border: 1px solid var(--border);
    }

    .divider { height: 1px; background: var(--border); width: 100%; }

    .dot-lost { width:8px;height:8px;border-radius:50%;background:var(--red);display:inline-block; }
    .dot-found { width:8px;height:8px;border-radius:50%;background:var(--green);display:inline-block; }

    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

    .fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

    .pulse { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

    .scroll-y { overflow-y: auto; }
    .scroll-x { overflow-x: auto; }

    .toast {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      background: var(--surface2); border: 1px solid var(--border2);
      border-radius: var(--radius); padding: 14px 20px;
      font-size: 14px; box-shadow: var(--shadow);
      animation: slideUp 0.3s ease;
      max-width: 320px;
    }
    @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

    .progress-bar { height: 4px; border-radius: 99px; background: var(--border); overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #4f8cff, #7dd3fc); border-radius: 99px; transition: width 0.5s ease; }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.75);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 24px; backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }
    .modal-box {
      background: var(--surface); border: 1px solid var(--border2);
      border-radius: 16px; width: 100%; max-width: 560px;
      max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 64px rgba(0,0,40,0.7);
    }

    .tab-bar { display: flex; gap: 2px; background: var(--surface2); padding: 4px; border-radius: var(--radius-sm); }
    .tab { flex:1; padding: 7px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor:pointer; text-align:center; color: var(--text2); transition: all 0.15s; border:none; background:transparent; font-family:'DM Sans',sans-serif; }
    .tab.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }

    .match-bar { height: 6px; border-radius: 99px; background: var(--border); overflow:hidden; }
    .match-fill-high { height:100%; background: linear-gradient(90deg, var(--green), #22d3a0); border-radius:99px; }
    .match-fill-med { height:100%; background: linear-gradient(90deg, #4f8cff, #93c5fd); border-radius:99px; }
    .match-fill-low { height:100%; background: linear-gradient(90deg, var(--red), #60a5fa); border-radius:99px; }

    .podium-1 { background: linear-gradient(135deg,rgba(79,140,255,0.2),rgba(79,140,255,0.05)); border-color: rgba(79,140,255,0.4); }
    .podium-2 { background: linear-gradient(135deg,rgba(148,163,184,0.15),rgba(148,163,184,0.03)); border-color: rgba(148,163,184,0.3); }
    .podium-3 { background: linear-gradient(135deg,rgba(205,127,50,0.15),rgba(205,127,50,0.03)); border-color: rgba(205,127,50,0.3); }
  `}</style>
);

/* ─────────────────────────────────────────
   CONSTANTS & MOCK DATA
───────────────────────────────────────── */
const CATEGORIES = {
  Electronics: { icon: "💻", items: ["Laptop","Phone","Tablet","Charger","Earphones","Power Bank","Smart Watch","Calculator","Hard Drive","USB Drive","Camera","Keyboard","Mouse","Headphones","Bluetooth Speaker"] },
  Academic: { icon: "📚", items: ["Notebook","Textbook","ID Card","Library Card","Assignment Sheet","Lab Manual","Pen Pouch","Geometry Box","Backpack","Folder","Lecture Notes","Attendance Card","Exam Admit Card","Thesis Copy","Project Report"] },
  Personal: { icon: "👜", items: ["Wallet","Keys","Water Bottle","Glasses","Sunglasses","Medicine Pouch","Lunch Box","Umbrella","Sweater","Jacket","Cap","Belt","Watch","Diary","Passport"] },
  Accessories: { icon: "💍", items: ["Earrings","Necklace","Bracelet","Ring","Hair Clip","Hairband","Scarf","Gloves","Bag Charm","Keychain","Rubber Band Set","Bookmark","Stationery Set","Pen","Pencil"] },
  Sports: { icon: "🏏", items: ["Cricket Bat","Badminton Racket","Football","Water Bottle","Sports Gloves","Skipping Rope","Wristband","Gym Bag","Cycle Lock","Helmet"] },
};

const POINT_MAP = {
  Laptop:100, Phone:80, Tablet:90, "Smart Watch":70, Camera:85,
  Wallet:60, "ID Card":50, Charger:40, "Power Bank":45, Earphones:35,
  Keys:30, "Library Card":25, Backpack:50, Umbrella:20, "Water Bottle":20,
  Textbook:30, Notebook:20, "Exam Admit Card":55, Headphones:45,
  DEFAULT:15
};

const LOCATIONS = [
  "Main Library (Ground Floor)","Central Canteen","Block A - Corridor","Block B - Lobby",
  "Science Block","Engineering Block","Admin Office","Sports Complex","Girls Hostel",
  "Boys Hostel","Parking Lot","Medical Centre","Auditorium","Computer Lab 1",
  "Workshop Area","Bus Stand","Gym","Swimming Pool Block"
];

const BADGES = {
  "Verified Student": { icon: "🎓", color: "badge-blue" },
  "Trusted Finder": { icon: "🔍", color: "badge-green" },
  "Generosity Star": { icon: "⭐", color: "badge-amber" },
  "Community Hero": { icon: "🦸", color: "badge-purple" },
  "Top Contributor": { icon: "🏆", color: "badge-amber" },
};

const MOCK_USERS = [
  { id:"u1", name:"Arjun Mehta", email:"arjun@college.edu", role:"user", generosityPoints:3200, finderScore:94, badges:["Verified Student","Trusted Finder","Generosity Star"], foundCount:18, avatar:"AM" },
  { id:"u2", name:"Priya Sharma", email:"priya@college.edu", role:"user", generosityPoints:2800, finderScore:89, badges:["Verified Student","Trusted Finder"], foundCount:14, avatar:"PS" },
  { id:"u3", name:"Rahul Verma", email:"rahul@college.edu", role:"user", generosityPoints:2100, finderScore:82, badges:["Verified Student"], foundCount:9, avatar:"RV" },
  { id:"u4", name:"Sneha Patel", email:"sneha@college.edu", role:"user", generosityPoints:1750, finderScore:78, badges:["Verified Student","Community Hero"], foundCount:7, avatar:"SP" },
  { id:"u5", name:"Vikram Singh", email:"vikram@college.edu", role:"user", generosityPoints:1200, finderScore:71, badges:["Verified Student"], foundCount:5, avatar:"VS" },
  { id:"u6", name:"Admin User", email:"admin@college.edu", role:"admin", generosityPoints:0, finderScore:100, badges:["Verified Student"], foundCount:0, avatar:"AD" },
];

const MOCK_ITEMS = [
  { id:"i1", title:"Black HP Laptop", description:"HP Pavilion 15 laptop found near Engineering Block entrance. Has a blue sticker on cover.", category:"Electronics", subCategory:"Laptop", color:"Black", date:"2025-04-22", location:"Engineering Block", type:"found", imageURL:"", postedBy:"u2", status:"unclaimed", suspiciousFlag:false, hiddenDetails:{brand:"HP",serialNumber:"5CD1234XYZ",hiddenMark:"Blue 'CS22' sticker on back"},createdAt:"2025-04-22" },
  { id:"i2", title:"Samsung Galaxy S24", description:"Blue phone found in canteen area. Screen has a small crack on corner. Has a transparent cover.", category:"Electronics", subCategory:"Phone", color:"Blue", date:"2025-04-21", location:"Central Canteen", type:"found", imageURL:"", postedBy:"u3", status:"unclaimed", suspiciousFlag:false, hiddenDetails:{brand:"Samsung",serialNumber:"R58N123456",hiddenMark:"Small crack, transparent cover"},createdAt:"2025-04-21" },
  { id:"i3", title:"Lost My Wallet", description:"Brown leather wallet lost near library. Had college ID card, ATM card and some cash inside.", category:"Personal", subCategory:"Wallet", color:"Brown", date:"2025-04-20", location:"Main Library (Ground Floor)", type:"lost", imageURL:"", postedBy:"u1", status:"unclaimed", suspiciousFlag:false, hiddenDetails:{brand:"Fastrack",serialNumber:"",hiddenMark:"Initials 'AM' written inside"},createdAt:"2025-04-20" },
  { id:"i4", title:"Scientific Calculator", description:"Casio fx-991EX calculator found on a bench in the science block. Has name sticker on back.", category:"Electronics", subCategory:"Calculator", color:"Black", date:"2025-04-19", location:"Science Block", type:"found", imageURL:"", postedBy:"u4", status:"pending", suspiciousFlag:false, hiddenDetails:{brand:"Casio",serialNumber:"",hiddenMark:"Name sticker on back"},createdAt:"2025-04-19" },
  { id:"i5", title:"Blue JBL Earphones", description:"Found a pair of JBL earphones near computer lab. In original case.", category:"Electronics", subCategory:"Earphones", color:"Blue", date:"2025-04-23", location:"Computer Lab 1", type:"found", imageURL:"", postedBy:"u1", status:"unclaimed", suspiciousFlag:false, hiddenDetails:{brand:"JBL",serialNumber:"",hiddenMark:"Small green tape on left earbud"},createdAt:"2025-04-23" },
  { id:"i6", title:"LOST: College ID Card", description:"Lost my college ID card near admin office. Name: Rahul Verma. Batch 2022.", category:"Academic", subCategory:"ID Card", color:"White", date:"2025-04-18", location:"Admin Office", type:"lost", imageURL:"", postedBy:"u3", status:"unclaimed", suspiciousFlag:false, hiddenDetails:{brand:"",serialNumber:"2022CSE047",hiddenMark:""},createdAt:"2025-04-18" },
  { id:"i7", title:"Grey Backpack", description:"Found a grey Wildcraft backpack near parking lot. Has water bottle in side pocket and some notebooks.", category:"Personal", subCategory:"Backpack", color:"Grey", date:"2025-04-17", location:"Parking Lot", type:"found", imageURL:"", postedBy:"u5", status:"claimed", suspiciousFlag:false, hiddenDetails:{brand:"Wildcraft",serialNumber:"",hiddenMark:"Green keychain attached"},createdAt:"2025-04-17" },
  { id:"i8", title:"Suspicious Phone Report", description:"Iphone 14 found near hostel.", category:"Electronics", subCategory:"Phone", color:"Black", date:"2025-04-23", location:"Boys Hostel", type:"found", imageURL:"", postedBy:"u3", status:"pending", suspiciousFlag:true, hiddenDetails:{brand:"Apple",serialNumber:"",hiddenMark:""},createdAt:"2025-04-23" },
];

const MOCK_CLAIMS = [
  { id:"c1", itemId:"i1", userId:"u5", answers:{"What brand is the laptop?":"HP","What sticker is on back?":"A blue CS sticker with text CS22","What is approx serial number prefix?":"5CD"}, status:"pending", adminFeedback:"", createdAt:"2025-04-23" },
  { id:"c2", itemId:"i4", userId:"u1", answers:{"What is the calculator model?":"fx-991EX","What's on the back?":"My name sticker, Arjun M"}, status:"pending", adminFeedback:"", createdAt:"2025-04-20" },
];

const MOCK_ROOMS = [
  { id:"r1", name:"Main Library - Info Desk", description:"Items found in/around library are kept here. Open 9AM-6PM.", addedByAdmin:true },
  { id:"r2", name:"Security Room - Gate 1", description:"Items found near gate, parking, and entry areas.", addedByAdmin:true },
  { id:"r3", name:"Student Affairs Office", description:"High-value items, IDs, wallets. Open Mon-Sat 10AM-4PM.", addedByAdmin:true },
  { id:"r4", name:"Canteen Lost Box", description:"Small items found in canteen area kept at counter.", addedByAdmin:true },
];

/* ─────────────────────────────────────────
   UTILITY FUNCTIONS
───────────────────────────────────────── */
const getUserById = (id) => MOCK_USERS.find(u => u.id === id);
const formatDate = (d) => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
const timeSince = (d) => {
  const diff = Date.now() - new Date(d).getTime();
  const days = Math.floor(diff/86400000);
  if(days===0) return "Today"; if(days===1) return "Yesterday"; return `${days}d ago`;
};
const getPoints = (sub) => POINT_MAP[sub] || POINT_MAP.DEFAULT;

function computeMatch(lost, found) {
  if (!lost || !found) return 0;
  let score = 0, total = 0;
  if (lost.category && found.category) { total+=30; if(lost.category===found.category) score+=30; }
  if (lost.subCategory && found.subCategory) { total+=20; if(lost.subCategory===found.subCategory) score+=20; }
  if (lost.color && found.color) { total+=15; if(lost.color.toLowerCase()===found.color.toLowerCase()) score+=15; }
  if (lost.location && found.location) { total+=15; if(lost.location===found.location) score+=15; else if(lost.location.split(" ")[0]===found.location.split(" ")[0]) score+=7; }
  const lostWords = (lost.title+" "+lost.description).toLowerCase().split(/\s+/);
  const foundWords = (found.title+" "+found.description).toLowerCase().split(/\s+/);
  const common = lostWords.filter(w=>w.length>3 && foundWords.includes(w));
  total+=20; score+=Math.min(20, common.length*4);
  return Math.round((score/total)*100);
}

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const Icon = ({ n, size=16, style={} }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M16.24 7.76a6 6 0 010 8.49M4.93 4.93a10 10 0 000 14.14M7.76 7.76a6 6 0 000 8.49"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
    flag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    bookmark: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
    qr: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 16h-3a2 2 0 00-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 01-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>,
    sparkle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5z"/><path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5z"/></svg>,
    loader: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    gift: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>,
  };
  return <span style={{display:"inline-flex",alignItems:"center",...style}}>{icons[n] || null}</span>;
};

/* ─────────────────────────────────────────
   AVATAR
───────────────────────────────────────── */
const Avatar = ({ user, size=36 }) => {
  const colors = ["#4f8cff","#4ade80","#60a5fa","#a78bfa","#f87171","#34d399"];
  const color = colors[user?.id?.charCodeAt(1) % colors.length] || colors[0];
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`2px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:700,color,fontFamily:"Syne,sans-serif",flexShrink:0}}>
      {user?.avatar || "?"}
    </div>
  );
};

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
const Toast = ({ msg, type="info", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  const colors = { success:"var(--green)", error:"var(--red)", info:"var(--amber)", warning:"#60a5fa" };
  return (
    <div className="toast" style={{borderLeft:`3px solid ${colors[type]}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:18}}>{type==="success"?"✅":type==="error"?"❌":type==="warning"?"⚠️":"💡"}</span>
        <span style={{flex:1,color:"var(--text)",fontSize:14}}>{msg}</span>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"var(--text3)",fontSize:18}}>×</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   ITEM CARD
───────────────────────────────────────── */
const ItemCard = ({ item, onClick, bookmarked, onBookmark }) => {
  const poster = getUserById(item.postedBy);
  const points = getPoints(item.subCategory);
  const catIcon = CATEGORIES[item.category]?.icon || "📦";
  return (
    <div className="card fade-in" style={{padding:0,overflow:"hidden",cursor:"pointer",position:"relative"}} onClick={onClick}>
      {item.suspiciousFlag && (
        <div style={{background:"rgba(248,113,113,0.15)",borderBottom:"1px solid rgba(248,113,113,0.3)",padding:"6px 14px",display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--red)"}}>
          <Icon n="alert" size={12}/> Flagged for review
        </div>
      )}
      <div style={{padding:"16px 16px 12px"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:22}}>{catIcon}</span>
            <div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:15,color:"var(--text)",lineHeight:1.2}}>{item.title}</div>
              <div style={{fontSize:12,color:"var(--text3)",marginTop:2}}>{item.location}</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
            <span className={`badge ${item.type==="found"?"badge-green":"badge-red"}`}>
              <span className={item.type==="found"?"dot-found":"dot-lost"}/>
              {item.type==="found"?"Found":"Lost"}
            </span>
            {item.type==="found" && <span style={{fontSize:11,color:"var(--amber)",fontWeight:600}}>+{points}pts</span>}
          </div>
        </div>
        <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.5,marginBottom:12,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {item.description}
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
          <span className="tag">{item.category}</span>
          <span className="tag">{item.subCategory}</span>
          {item.color && <span className="tag">{item.color}</span>}
        </div>
        <div className="divider" style={{marginBottom:10}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <Avatar user={poster} size={24}/>
            <span style={{fontSize:12,color:"var(--text3)"}}>{poster?.name?.split(" ")[0]}</span>
            <span style={{fontSize:11,color:"var(--text3)"}}>· {timeSince(item.createdAt)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <button onClick={e=>{e.stopPropagation();onBookmark(item.id);}} className="btn btn-ghost btn-sm" style={{padding:"4px 8px",color:bookmarked?"var(--amber)":"var(--text3)"}}>
              <Icon n="bookmark" size={14}/>
            </button>
            <span className={`badge ${item.status==="claimed"?"badge-green":item.status==="pending"?"badge-amber":"badge-gray"}`} style={{fontSize:11}}>
              {item.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   ITEM DETAIL MODAL
───────────────────────────────────────── */
const ItemDetailModal = ({ item, onClose, currentUser, onClaim, onReport, toast }) => {
  const [answers, setAnswers] = useState({});
  const poster = getUserById(item.postedBy);
  const points = getPoints(item.subCategory);

  const verifyQuestions = [
    `What color is the ${item.subCategory}?`,
    `Where approximately did you lose/find it?`,
    `Is there any distinctive mark, label, or sticker on it?`,
    `What approximate date did you lose it?`,
  ];

  const handleClaim = () => {
    if(Object.keys(answers).length < 2) { toast("Please answer at least 2 questions","warning"); return; }
    onClaim(item.id, answers);
    toast("Claim submitted! Admin will review and contact you shortly.","success");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div style={{padding:"20px 24px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:24}}>{CATEGORIES[item.category]?.icon||"📦"}</span>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:20,color:"var(--text)"}}>{item.title}</h2>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <span className={`badge ${item.type==="found"?"badge-green":"badge-red"}`}>{item.type==="found"?"Found":"Lost"}</span>
              <span className={`badge ${item.status==="claimed"?"badge-green":item.status==="pending"?"badge-amber":"badge-gray"}`}>{item.status}</span>
              {item.type==="found" && <span style={{fontSize:12,color:"var(--amber)",fontWeight:600,padding:"3px 0"}}>+{points} pts</span>}
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><Icon n="close" size={14}/></button>
        </div>
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["📅 Date",formatDate(item.date)],["📍 Location",item.location],["🗂 Category",item.category],["🏷 Sub-category",item.subCategory]].map(([k,v])=>(
              <div key={k} style={{background:"var(--surface2)",borderRadius:"var(--radius-sm)",padding:"10px 12px"}}>
                <div style={{fontSize:11,color:"var(--text3)",marginBottom:3}}>{k}</div>
                <div style={{fontSize:13,color:"var(--text)",fontWeight:500}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:16}}>
            <div className="label">Description</div>
            <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.7,background:"var(--surface2)",padding:12,borderRadius:"var(--radius-sm)"}}>{item.description}</p>
          </div>
          <div style={{background:"rgba(79,140,255,0.08)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:"var(--radius-sm)",padding:"12px 14px",marginBottom:16,display:"flex",gap:10}}>
            <Icon n="lock" size={16} style={{color:"var(--amber)",marginTop:1,flexShrink:0}}/>
            <div>
              <div style={{fontSize:13,color:"var(--amber)",fontWeight:600,marginBottom:3}}>Verification Details Hidden</div>
              <div style={{fontSize:12,color:"var(--text2)"}}>Brand, serial number, and identifying marks are hidden. Answer verification questions below to prove ownership.</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px",background:"var(--surface2)",borderRadius:"var(--radius-sm)",marginBottom:16}}>
            <Avatar user={poster} size={36}/>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{poster?.name}</div>
              <div style={{fontSize:12,color:"var(--text3)"}}>Posted {timeSince(item.createdAt)} · Reliability {poster?.finderScore}%</div>
            </div>
          </div>
          {item.type==="found" && item.status!=="claimed" && currentUser?.id !== item.postedBy && (
            <div style={{border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",overflow:"hidden",marginBottom:12}}>
              <div style={{padding:"12px 14px",background:"var(--surface2)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8}}>
                <Icon n="check" size={14} style={{color:"var(--green)"}}/>
                <span style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>Claim This Item</span>
              </div>
              <div style={{padding:14}}>
                <p style={{fontSize:13,color:"var(--text2)",marginBottom:12}}>Answer the verification questions to prove ownership. Admin will review and contact you.</p>
                {verifyQuestions.map((q,i)=>(
                  <div key={i} style={{marginBottom:10}}>
                    <label className="label">{q}</label>
                    <textarea className="input" rows={2} style={{resize:"vertical"}} placeholder="Your answer..." value={answers[q]||""} onChange={e=>setAnswers({...answers,[q]:e.target.value})}/>
                  </div>
                ))}
                <button className="btn btn-amber" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={handleClaim}>
                  <Icon n="check" size={14}/> Submit Claim for Review
                </button>
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn btn-danger btn-sm" onClick={()=>{ onReport(item.id); toast("Item reported.","info"); onClose(); }}>
              <Icon n="flag" size={13}/> Report Suspicious
            </button>
            <button className="btn btn-ghost btn-sm"><Icon n="qr" size={13}/> View QR</button>
            <button className="btn btn-ghost btn-sm"><Icon n="bookmark" size={13}/> Bookmark</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   POST ITEM FORM
───────────────────────────────────────── */
const PostItemForm = ({ onClose, onPost, currentUser, toast }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title:"", description:"", category:"Electronics", subCategory:"", color:"", date:"", location:"", type:"found", hiddenBrand:"", hiddenSerial:"", hiddenMark:"" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const subCats = CATEGORIES[form.category]?.items || [];

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.location || !form.date) { toast("Please fill all required fields","warning"); return; }
    const points = getPoints(form.subCategory);
    onPost({ ...form, id:"i"+Date.now(), postedBy:currentUser?.id, status:"unclaimed", suspiciousFlag:false, createdAt:new Date().toISOString().slice(0,10) });
    toast(`Item posted! You earned +${points} Generosity Points 🎉`,"success");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div style={{padding:"20px 24px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"var(--text)"}}>Post an Item</h2>
            <div style={{fontSize:13,color:"var(--text3)",marginTop:2}}>Step {step} of 3</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><Icon n="close" size={14}/></button>
        </div>
        <div style={{padding:"12px 24px 0"}}>
          <div style={{height:4,borderRadius:99,background:"var(--border)"}}>
            <div style={{height:"100%",background:"var(--amber)",borderRadius:99,width:`${(step/3)*100}%`,transition:"width 0.3s"}}/>
          </div>
        </div>
        <div style={{padding:"16px 24px 24px"}}>
          {step===1 && (
            <div className="fade-in">
              <div style={{marginBottom:14}}>
                <label className="label">Item Type *</label>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {["found","lost"].map(t=>(
                    <button key={t} onClick={()=>set("type",t)} style={{padding:"12px",borderRadius:"var(--radius-sm)",border:`2px solid ${form.type===t?(t==="found"?"var(--green)":"var(--red)"):"var(--border)"}`,background:form.type===t?(t==="found"?"rgba(74,222,128,0.1)":"rgba(248,113,113,0.1)"):"var(--surface2)",cursor:"pointer",color:"var(--text)",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:15,transition:"all 0.15s"}}>
                      {t==="found"?"✅ I Found It":"🔍 I Lost It"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <label className="label">Title *</label>
                <input className="input" placeholder="e.g. Black HP Laptop" value={form.title} onChange={e=>set("title",e.target.value)}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                <div>
                  <label className="label">Category *</label>
                  <select className="input" value={form.category} onChange={e=>{set("category",e.target.value);set("subCategory","");}}>
                    {Object.keys(CATEGORIES).map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Sub-Category *</label>
                  <select className="input" value={form.subCategory} onChange={e=>set("subCategory",e.target.value)}>
                    <option value="">Select...</option>
                    {subCats.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div>
                  <label className="label">Color</label>
                  <input className="input" placeholder="e.g. Black, Blue" value={form.color} onChange={e=>set("color",e.target.value)}/>
                </div>
                <div>
                  <label className="label">Date *</label>
                  <input type="date" className="input" value={form.date} onChange={e=>set("date",e.target.value)}/>
                </div>
              </div>
            </div>
          )}
          {step===2 && (
            <div className="fade-in">
              <div style={{marginBottom:14}}>
                <label className="label">Location *</label>
                <select className="input" value={form.location} onChange={e=>set("location",e.target.value)}>
                  <option value="">Select location...</option>
                  {LOCATIONS.map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
              <div style={{marginBottom:14}}>
                <label className="label">Description *</label>
                <textarea className="input" rows={4} placeholder="Describe the item in detail..." style={{resize:"vertical"}} value={form.description} onChange={e=>set("description",e.target.value)}/>
              </div>
            </div>
          )}
          {step===3 && (
            <div className="fade-in">
              <div style={{background:"rgba(79,140,255,0.08)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:"var(--radius-sm)",padding:"12px 14px",marginBottom:16}}>
                <div style={{fontSize:13,color:"var(--amber)",fontWeight:600,marginBottom:4}}><Icon n="lock" size={13}/> Hidden Verification Details</div>
                <div style={{fontSize:12,color:"var(--text2)"}}>These details are NEVER shown publicly. Used only to verify true owner during claim process.</div>
              </div>
              <div style={{marginBottom:12}}>
                <label className="label">Brand / Model (hidden)</label>
                <input className="input" placeholder="e.g. HP, Samsung" value={form.hiddenBrand} onChange={e=>set("hiddenBrand",e.target.value)}/>
              </div>
              <div style={{marginBottom:12}}>
                <label className="label">Serial Number (hidden)</label>
                <input className="input" placeholder="Last 4 digits or partial..." value={form.hiddenSerial} onChange={e=>set("hiddenSerial",e.target.value)}/>
              </div>
              <div style={{marginBottom:12}}>
                <label className="label">Distinctive Mark</label>
                <textarea className="input" rows={3} placeholder="e.g. Name sticker, specific scratch..." style={{resize:"vertical"}} value={form.hiddenMark} onChange={e=>set("hiddenMark",e.target.value)}/>
              </div>
              {form.subCategory && (
                <div style={{display:"flex",alignItems:"center",gap:6,padding:"10px 14px",background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:"var(--radius-sm)"}}>
                  <Icon n="star" size={14} style={{color:"var(--amber)"}}/>
                  <span style={{fontSize:13,color:"var(--green)"}}>You will earn <strong style={{color:"var(--amber)"}}>+{getPoints(form.subCategory)} Generosity Points</strong></span>
                </div>
              )}
            </div>
          )}
          <div style={{display:"flex",gap:8,marginTop:20}}>
            {step>1 && <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setStep(s=>s-1)}>← Back</button>}
            {step<3 ? (
              <button className="btn btn-amber" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(s=>s+1)}>Continue →</button>
            ) : (
              <button className="btn btn-amber" style={{flex:1,justifyContent:"center"}} onClick={handleSubmit}>
                <Icon n="check" size={14}/> Post Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   AI MATCH PANEL
───────────────────────────────────────── */
const AIMatchPanel = ({ items, currentUser, toast }) => {
  const [lostItem, setLostItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [aiInsight, setAiInsight] = useState("");

  const lostItems = items.filter(i=>i.type==="lost");
  const foundItems = items.filter(i=>i.type==="found"&&i.status!=="claimed");

  const runAIMatch = async () => {
    if (!lostItem) { toast("Select a lost item first","warning"); return; }
    setLoading(true); setResults(null); setAiInsight("");
    const selected = items.find(i=>i.id===lostItem);
    const matches = foundItems.map(f => ({ item:f, score:computeMatch(selected,f) }))
      .filter(m=>m.score>0).sort((a,b)=>b.score-a.score).slice(0,5);

    try {
      const prompt = `You are a Lost & Found matching assistant for a college campus.
A student lost: "${selected.title}" (${selected.category} - ${selected.subCategory}, ${selected.color}, at ${selected.location} on ${selected.date}).
Description: "${selected.description}"
Top matches:
${matches.map((m,i)=>`${i+1}. "${m.item.title}" at ${m.item.location} on ${m.item.date} (Score: ${m.score}%) - "${m.item.description}"`).join("\n")}
Provide: 1) Brief analysis of best match (2 sentences) 2) Key reasons why/why not 3) One practical suggestion. Keep under 120 words.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] })
      });
      const data = await res.json();
      setAiInsight(data.content?.[0]?.text || "Unable to get AI analysis.");
    } catch(e) {
      setAiInsight("AI analysis unavailable — showing rule-based matches only.");
    }
    setResults(matches);
    setLoading(false);
  };

  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <Icon n="sparkle" size={18} style={{color:"var(--amber)"}}/>
          <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"var(--text)"}}>AI Match Finder</h3>
        </div>
        <p style={{fontSize:13,color:"var(--text2)"}}>Select a lost item and our AI will scan all found items for possible matches.</p>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        <select className="input" value={lostItem} onChange={e=>setLostItem(e.target.value)} style={{flex:1}}>
          <option value="">Select a lost item...</option>
          {lostItems.map(i=><option key={i.id} value={i.id}>{i.title} — {i.location}</option>)}
        </select>
        <button className="btn btn-amber" onClick={runAIMatch} disabled={loading} style={{minWidth:120,justifyContent:"center"}}>
          {loading ? <><Icon n="loader" size={14}/> Scanning...</> : <><Icon n="sparkle" size={14}/> Find Matches</>}
        </button>
      </div>
      {results && (
        <div className="fade-in">
          {aiInsight && (
            <div style={{background:"rgba(79,140,255,0.08)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:"var(--radius-sm)",padding:"14px 16px",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <Icon n="sparkle" size={14} style={{color:"var(--amber)"}}/>
                <span style={{fontSize:13,fontWeight:600,color:"var(--amber)"}}>AI Analysis</span>
              </div>
              <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7}}>{aiInsight}</p>
            </div>
          )}
          {results.length===0 ? (
            <div style={{textAlign:"center",padding:"32px",color:"var(--text3)",fontSize:14}}>No matches found. Check back later.</div>
          ) : results.map(({ item, score }) => {
            const cls = score>=70?"match-fill-high":score>=40?"match-fill-med":"match-fill-low";
            const col = score>=70?"var(--green)":score>=40?"var(--amber)":"var(--red)";
            return (
              <div key={item.id} className="card" style={{padding:"14px 16px",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:18}}>{CATEGORIES[item.category]?.icon||"📦"}</span>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{item.title}</div>
                      <div style={{fontSize:12,color:"var(--text3)"}}>{item.location} · {formatDate(item.date)}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:18,fontFamily:"Syne,sans-serif",fontWeight:800,color:col}}>{score}%</div>
                    <div style={{fontSize:11,color:"var(--text3)"}}>match</div>
                  </div>
                </div>
                <div className="match-bar"><div className={cls} style={{width:`${score}%`}}/></div>
                <p style={{fontSize:12,color:"var(--text3)",marginTop:8}}>{item.description.slice(0,100)}...</p>
              </div>
            );
          })}
        </div>
      )}
      {!results && !loading && (
        <div style={{textAlign:"center",padding:"40px 20px",color:"var(--text3)"}}>
          <div style={{fontSize:40,marginBottom:8}}>🔍</div>
          <div style={{fontSize:14}}>Select a lost item above to find possible matches</div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   LEADERBOARD
───────────────────────────────────────── */
const Leaderboard = ({ currentUser }) => {
  const sorted = [...MOCK_USERS].filter(u=>u.role!=="admin").sort((a,b)=>b.generosityPoints-a.generosityPoints);
  const NEXT_REWARD = 2500;
  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <Icon n="trophy" size={20} style={{color:"var(--amber)"}}/>
          <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"var(--text)"}}>Generosity Leaderboard</h3>
        </div>
        <p style={{fontSize:13,color:"var(--text2)"}}>Top students who returned the most items. Earn 2500 points → ₹100 Canteen Voucher!</p>
      </div>
      <div style={{background:"linear-gradient(135deg,rgba(79,140,255,0.15),rgba(79,140,255,0.03))",border:"1px solid rgba(79,140,255,0.3)",borderRadius:"var(--radius)",padding:"16px 20px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Avatar user={currentUser} size={42}/>
            <div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,color:"var(--text)"}}>{currentUser?.name}</div>
              <div style={{fontSize:12,color:"var(--text3)"}}>Rank #{sorted.findIndex(u=>u.id===currentUser?.id)+1} · {currentUser?.foundCount} items found</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:24,color:"var(--amber)"}}>{currentUser?.generosityPoints?.toLocaleString()}</div>
            <div style={{fontSize:11,color:"var(--text3)"}}>points</div>
          </div>
        </div>
        <div className="label" style={{marginBottom:4}}>Progress to ₹100 Voucher</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{width:`${Math.min(100,(currentUser?.generosityPoints/NEXT_REWARD)*100)}%`}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:11,color:"var(--text3)"}}>
          <span>{currentUser?.generosityPoints} / {NEXT_REWARD} pts</span>
          <span>{Math.max(0,NEXT_REWARD-currentUser?.generosityPoints)} pts to go</span>
        </div>
      </div>
      {sorted.map((user, i) => {
        const podiumClass = i===0?"podium-1":i===1?"podium-2":i===2?"podium-3":"";
        const medal = ["🥇","🥈","🥉"][i] || `#${i+1}`;
        return (
          <div key={user.id} className={`card ${podiumClass}`} style={{padding:"12px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:32,textAlign:"center",fontSize:i<3?20:14,fontWeight:700,color:i<3?"var(--amber)":"var(--text3)",fontFamily:"Syne,sans-serif"}}>{medal}</div>
            <Avatar user={user} size={38}/>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:600,color:"var(--text)",display:"flex",alignItems:"center",gap:6}}>
                {user.name}
                {user.id===currentUser?.id && <span style={{fontSize:11,color:"var(--amber)"}}>(you)</span>}
              </div>
              <div style={{display:"flex",gap:4,marginTop:3,flexWrap:"wrap"}}>
                {user.badges.slice(0,2).map(b=>(
                  <span key={b} className={`badge ${BADGES[b]?.color||"badge-gray"}`} style={{fontSize:10}}>{BADGES[b]?.icon} {b}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:16,color:i===0?"var(--amber)":"var(--text)"}}>{user.generosityPoints.toLocaleString()}</div>
              <div style={{fontSize:11,color:"var(--text3)"}}>{user.foundCount} items</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────
   ADMIN PANEL
───────────────────────────────────────── */
const AdminPanel = ({ items, claims, onApprove, onReject, onClearFlag, toast }) => {
  const [tab, setTab] = useState("pending");
  const flagged = items.filter(i=>i.suspiciousFlag||i.status==="pending");
  const pendingClaims = claims.filter(c=>c.status==="pending");
  const getClaimItem = (id) => items.find(i=>i.id===id);
  const getClaimUser = (id) => MOCK_USERS.find(u=>u.id===id);

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <Icon n="settings" size={20} style={{color:"var(--amber)"}}/>
        <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:"var(--text)"}}>Admin Panel</h3>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        {[
          { label:"Total Items", value:items.length, icon:"📦", color:"var(--blue)" },
          { label:"Pending Claims", value:pendingClaims.length, icon:"⏳", color:"var(--amber)" },
          { label:"Flagged Items", value:flagged.length, icon:"🚩", color:"var(--red)" },
          { label:"Claimed", value:items.filter(i=>i.status==="claimed").length, icon:"✅", color:"var(--green)" },
        ].map(s=>(
          <div key={s.label} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"12px 14px",textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:20,color:s.color}}>{s.value}</div>
            <div style={{fontSize:11,color:"var(--text3)"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="tab-bar" style={{marginBottom:16}}>
        {[["pending","Claims"],["flagged","Flagged"],["rooms","L&F Rooms"],["users","Users"]].map(([k,v])=>(
          <button key={k} className={`tab ${tab===k?"active":""}`} onClick={()=>setTab(k)}>{v}</button>
        ))}
      </div>
      {tab==="pending" && (
        <div className="fade-in">
          {pendingClaims.length===0 ? (
            <div style={{textAlign:"center",padding:"32px",color:"var(--text3)",fontSize:14}}>No pending claims</div>
          ) : pendingClaims.map(claim => {
            const item = getClaimItem(claim.itemId);
            const claimUser = getClaimUser(claim.userId);
            const item2 = items.find(i=>i.id===claim.itemId);
            return (
              <div key={claim.id} className="card" style={{padding:"16px",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12,gap:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:"var(--text)",marginBottom:2}}>{item?.title}</div>
                    <div style={{fontSize:12,color:"var(--text3)"}}>Claimed by <strong style={{color:"var(--text)"}}>{claimUser?.name}</strong> · {timeSince(claim.createdAt)}</div>
                  </div>
                  <span className="badge badge-amber">Pending</span>
                </div>
                <div style={{background:"var(--surface2)",borderRadius:"var(--radius-sm)",padding:"10px 12px",marginBottom:12}}>
                  {Object.entries(claim.answers).map(([q,a])=>(
                    <div key={q} style={{marginBottom:8}}>
                      <div style={{fontSize:12,color:"var(--text2)",marginBottom:2}}>{q}</div>
                      <div style={{fontSize:13,color:"var(--text)",fontWeight:500}}>{a}</div>
                    </div>
                  ))}
                </div>
                {item2?.hiddenDetails && (
                  <div style={{background:"rgba(79,140,255,0.08)",border:"1px solid rgba(79,140,255,0.2)",borderRadius:"var(--radius-sm)",padding:"10px 12px",marginBottom:12}}>
                    <div style={{fontSize:11,color:"var(--amber)",marginBottom:6,fontWeight:600}}>🔒 Hidden Details (Admin Only)</div>
                    {Object.entries(item2.hiddenDetails).filter(([,v])=>v).map(([k,v])=>(
                      <div key={k} style={{fontSize:12,color:"var(--text2)",marginBottom:3}}><span style={{color:"var(--text3)"}}>{k}:</span> {v}</div>
                    ))}
                  </div>
                )}
                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-green btn-sm" style={{flex:1,justifyContent:"center"}} onClick={()=>{onApprove(claim.id);toast(`Claim approved`,"success");}}>
                    <Icon n="check" size={13}/> Approve
                  </button>
                  <button className="btn btn-danger btn-sm" style={{flex:1,justifyContent:"center"}} onClick={()=>{onReject(claim.id);toast("Claim rejected","info");}}>
                    <Icon n="close" size={13}/> Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab==="flagged" && (
        <div className="fade-in">
          {flagged.length===0 ? (
            <div style={{textAlign:"center",padding:"32px",color:"var(--text3)",fontSize:14}}>No flagged items</div>
          ) : flagged.map(item => (
            <div key={item.id} className="card" style={{padding:"14px 16px",marginBottom:10,borderColor:item.suspiciousFlag?"rgba(248,113,113,0.3)":"var(--border)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:"var(--text)",marginBottom:4}}>{item.title}</div>
                  <div style={{fontSize:12,color:"var(--text3)"}}>{item.location} · by {getUserById(item.postedBy)?.name}</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button className="btn btn-green btn-sm" onClick={()=>{onClearFlag(item.id);toast("Item cleared","success");}}>
                    <Icon n="check" size={13}/> Clear
                  </button>
                  <button className="btn btn-danger btn-sm"><Icon n="close" size={13}/> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab==="rooms" && (
        <div className="fade-in">
          {MOCK_ROOMS.map(room => (
            <div key={room.id} className="card" style={{padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <Icon n="map" size={14} style={{color:"var(--amber)"}}/>
                <span style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{room.name}</span>
              </div>
              <p style={{fontSize:12,color:"var(--text2)"}}>{room.description}</p>
            </div>
          ))}
          <button className="btn btn-amber" style={{width:"100%",justifyContent:"center",marginTop:8}}>
            <Icon n="plus" size={14}/> Add New Room
          </button>
        </div>
      )}
      {tab==="users" && (
        <div className="fade-in">
          {MOCK_USERS.filter(u=>u.role!=="admin").map(user => (
            <div key={user.id} className="card" style={{padding:"12px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
              <Avatar user={user} size={38}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{user.name}</div>
                <div style={{fontSize:12,color:"var(--text3)"}}>{user.email} · Score: {user.finderScore}%</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:14,fontWeight:700,color:"var(--amber)"}}>{user.generosityPoints} pts</div>
                <div style={{fontSize:11,color:"var(--text3)"}}>{user.foundCount} found</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────── */
const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (asAdmin=false) => {
    const targetEmail = asAdmin ? "admin@college.edu" : email;
    const user = MOCK_USERS.find(u=>u.email===targetEmail);
    if (!user) { setError("No account found. Use a @college.edu email."); return; }
    setError(""); onLogin(user);
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <nav style={{padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid var(--border)",position:"sticky",top:0,background:"rgba(7,16,31,0.95)",backdropFilter:"blur(10px)",zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"var(--amber)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16,color:"#fff",fontFamily:"Syne,sans-serif"}}>U</div>
          <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:18,color:"var(--text)"}}>uniFind</span>
          <span style={{fontSize:11,color:"var(--text3)",background:"var(--surface2)",padding:"2px 8px",borderRadius:99,border:"1px solid var(--border)"}}>Campus Edition</span>
        </div>
        <button className="btn btn-amber" onClick={()=>document.getElementById("login-section").scrollIntoView({behavior:"smooth"})}>Sign In</button>
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"64px 32px 32px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 50%, rgba(79,140,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(125,211,252,0.06) 0%, transparent 50%)",pointerEvents:"none"}}/>
        <div style={{background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.3)",borderRadius:99,padding:"6px 16px",fontSize:12,color:"var(--amber)",marginBottom:20,fontWeight:500}}>
          🎓 Exclusively for College Students
        </div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(36px,6vw,72px)",lineHeight:1.05,marginBottom:20,letterSpacing:"-1px",maxWidth:800}}>
          Find What's Lost.<br/><span style={{color:"var(--amber)"}}>Return What's Found.</span>
        </h1>
        <p style={{fontSize:"clamp(14px,2vw,18px)",color:"var(--text2)",maxWidth:560,lineHeight:1.7,marginBottom:32}}>
          A trusted lost & found portal for your campus — with AI matching, fraud detection, and a generosity rewards system.
        </p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:48}}>
          <button className="btn btn-amber" style={{padding:"12px 28px",fontSize:15}} onClick={()=>document.getElementById("login-section").scrollIntoView({behavior:"smooth"})}>
            <Icon n="search" size={16}/> Find My Item
          </button>
          <button className="btn btn-ghost" style={{padding:"12px 28px",fontSize:15}} onClick={()=>document.getElementById("login-section").scrollIntoView({behavior:"smooth"})}>
            <Icon n="plus" size={16}/> Report Found Item
          </button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--border)",borderRadius:"var(--radius)",overflow:"hidden",width:"100%",maxWidth:600}}>
          {[["1,240+","Items Posted"],["890+","Items Returned"],["450+","Active Students"],["₹12K+","Vouchers Given"]].map(([v,l])=>(
            <div key={l} style={{background:"var(--surface)",padding:"20px 16px",textAlign:"center"}}>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:22,color:"var(--amber)",marginBottom:4}}>{v}</div>
              <div style={{fontSize:12,color:"var(--text3)"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"48px 32px",maxWidth:1000,margin:"0 auto",width:"100%"}}>
        <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:28,textAlign:"center",marginBottom:32}}>Why uniFind?</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {[
            { icon:"🤖", title:"AI Match Engine", desc:"Automatically suggests found items that match your lost report using keywords, category, color & location." },
            { icon:"🔒", title:"Claim Verification", desc:"Hidden item details protect against fraud. Only the true owner can answer verification questions." },
            { icon:"🎁", title:"Generosity Points", desc:"Earn points for every found item you return. Redeem ₹100 canteen vouchers at 2500 points." },
            { icon:"🚩", title:"Fraud Detection", desc:"AI flags suspicious posts automatically. Duplicate and repeated listings go to admin review." },
            { icon:"📍", title:"L&F Room Map", desc:"Know exactly which office holds each item. Pick up directly — no hassle." },
            { icon:"🏆", title:"Leaderboard", desc:"Compete with peers to top the generosity charts. Badges, titles, and real rewards await." },
          ].map(f=>(
            <div key={f.title} className="card" style={{padding:"20px"}}>
              <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:15,color:"var(--text)",marginBottom:6}}>{f.title}</div>
              <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="login-section" style={{padding:"48px 32px",display:"flex",justifyContent:"center"}}>
        <div style={{width:"100%",maxWidth:380}}>
          <div className="card" style={{padding:"28px 24px"}}>
            <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:20,marginBottom:4}}>Sign In to uniFind</h2>
            <p style={{fontSize:13,color:"var(--text3)",marginBottom:20}}>College email required</p>
            <div style={{marginBottom:12}}>
              <label className="label">College Email</label>
              <input className="input" type="email" placeholder="you@college.edu" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
            </div>
            <div style={{marginBottom:16}}>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
            </div>
            {error && <div style={{fontSize:13,color:"var(--red)",marginBottom:12,padding:"8px 10px",background:"rgba(248,113,113,0.1)",borderRadius:"var(--radius-sm)"}}>{error}</div>}
            <button className="btn btn-amber" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>handleLogin()}>Sign In</button>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <button className="btn btn-ghost btn-sm" style={{justifyContent:"center",fontSize:12}} onClick={()=>onLogin(MOCK_USERS[0])}>👤 Demo User</button>
              <button className="btn btn-ghost btn-sm" style={{justifyContent:"center",fontSize:12}} onClick={()=>handleLogin(true)}>⚙️ Demo Admin</button>
            </div>
            <div style={{marginTop:12,padding:"10px 12px",background:"var(--surface2)",borderRadius:"var(--radius-sm)",fontSize:12,color:"var(--text3)"}}>
              Demo: <strong style={{color:"var(--text2)"}}>arjun@college.edu</strong> / any password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────── */
const Dashboard = ({ currentUser, onLogout }) => {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [claims, setClaims] = useState(MOCK_CLAIMS);
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterCat, setFilterCat] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type="info") => setToast({ msg, type, id:Date.now() });

  const filtered = items.filter(i => {
    if (filterType!=="all" && i.type!==filterType) return false;
    if (filterCat!=="all" && i.category!==filterCat) return false;
    if (filterStatus!=="all" && i.status!==filterStatus) return false;
    if (search && !`${i.title} ${i.description} ${i.location}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleBookmark = (id) => setBookmarks(b => b.includes(id) ? b.filter(x=>x!==id) : [...b,id]);
  const handlePost = (item) => setItems(prev => [item, ...prev]);
  const handleClaim = (itemId, answers) => {
    setClaims(prev => [{ id:"c"+Date.now(), itemId, userId:currentUser.id, answers, status:"pending", adminFeedback:"", createdAt:new Date().toISOString().slice(0,10) }, ...prev]);
    setItems(prev => prev.map(i => i.id===itemId ? {...i, status:"pending"} : i));
  };
  const handleApproveClaim = (claimId) => {
    const claim = claims.find(c=>c.id===claimId);
    setClaims(prev => prev.map(c => c.id===claimId ? {...c, status:"approved"} : c));
    if (claim) setItems(prev => prev.map(i => i.id===claim.itemId ? {...i, status:"claimed"} : i));
  };
  const handleRejectClaim = (claimId) => setClaims(prev => prev.map(c => c.id===claimId ? {...c, status:"rejected"} : c));
  const handleClearFlag = (itemId) => setItems(prev => prev.map(i => i.id===itemId ? {...i, suspiciousFlag:false, status:"unclaimed"} : i));

  const myStats = {
    found:items.filter(i=>i.postedBy===currentUser.id&&i.type==="found").length,
    lost:items.filter(i=>i.postedBy===currentUser.id&&i.type==="lost").length,
  };

  const navItems = [
    { id:"dashboard", label:"Browse", icon:"grid" },
    { id:"match", label:"AI Match", icon:"sparkle" },
    { id:"leaderboard", label:"Leaders", icon:"trophy" },
    ...(currentUser.role==="admin" ? [{ id:"admin", label:"Admin", icon:"settings" }] : []),
  ];

  return (
    <div style={{display:"flex",minHeight:"100vh",flexDirection:"column"}}>
      <header style={{padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid var(--border)",background:"rgba(7,16,31,0.95)",backdropFilter:"blur(10px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,background:"var(--amber)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:"#fff",fontFamily:"Syne,sans-serif"}}>U</div>
            <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:16,color:"var(--text)"}}>uniFind</span>
          </div>
          <nav style={{display:"flex",gap:4}}>
            {navItems.map(n=>(
              <button key={n.id} className="btn btn-ghost btn-sm" style={{color:page===n.id?"var(--amber)":"var(--text2)",background:page===n.id?"rgba(79,140,255,0.08)":"transparent",border:page===n.id?"1px solid rgba(79,140,255,0.2)":"1px solid transparent"}} onClick={()=>setPage(n.id)}>
                <Icon n={n.icon} size={13}/> {n.label}
              </button>
            ))}
          </nav>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{padding:"4px 12px",background:"rgba(79,140,255,0.12)",border:"1px solid rgba(79,140,255,0.25)",borderRadius:99,fontSize:13,color:"var(--amber)",fontWeight:600}}>
            <Icon n="star" size={12}/> {currentUser.generosityPoints.toLocaleString()} pts
          </div>
          <button className="btn btn-amber btn-sm" onClick={()=>setShowPost(true)}><Icon n="plus" size={13}/> Post Item</button>
          <div style={{cursor:"pointer"}} onClick={onLogout} title="Logout"><Avatar user={currentUser} size={30}/></div>
        </div>
      </header>
      <main style={{flex:1,padding:"24px",maxWidth:"100%",overflowX:"hidden"}}>
        {page==="dashboard" && (
          <div className="fade-in">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,gap:12,flexWrap:"wrap"}}>
              <div>
                <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:22,color:"var(--text)",marginBottom:2}}>Hello, {currentUser.name.split(" ")[0]} 👋</h2>
                <p style={{fontSize:13,color:"var(--text3)"}}>Browse or search for lost & found items on campus</p>
              </div>
              <div style={{display:"flex",gap:8}}>
                {[["var(--green)",myStats.found,"Found"],["var(--red)",myStats.lost,"Lost"],["var(--amber)",currentUser.generosityPoints,"Points"]].map(([c,v,l])=>(
                  <div key={l} style={{padding:"8px 14px",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",textAlign:"center"}}>
                    <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:c}}>{v}</div>
                    <div style={{fontSize:11,color:"var(--text3)"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {items.filter(i=>i.suspiciousFlag).length>0 && (
              <div style={{background:"rgba(248,113,113,0.08)",border:"1px solid rgba(248,113,113,0.25)",borderRadius:"var(--radius-sm)",padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
                <Icon n="alert" size={14} style={{color:"var(--red)"}}/>
                <span style={{fontSize:13,color:"var(--red)"}}>{items.filter(i=>i.suspiciousFlag).length} item(s) flagged by fraud detection. Admin review pending.</span>
              </div>
            )}
            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
              <div style={{position:"relative",flex:1,minWidth:200}}>
                <Icon n="search" size={14} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"var(--text3)"}}/>
                <input className="input" placeholder="Search items, locations..." style={{paddingLeft:34}} value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
              <div className="tab-bar" style={{minWidth:"fit-content"}}>
                {["all","found","lost"].map(t=>(
                  <button key={t} className={`tab ${filterType===t?"active":""}`} onClick={()=>setFilterType(t)} style={{minWidth:60,textTransform:"capitalize"}}>{t}</button>
                ))}
              </div>
              <select className="input" style={{width:"auto",minWidth:130}} value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
                <option value="all">All Categories</option>
                {Object.keys(CATEGORIES).map(c=><option key={c}>{c}</option>)}
              </select>
              <select className="input" style={{width:"auto",minWidth:120}} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="unclaimed">Unclaimed</option>
                <option value="pending">Pending</option>
                <option value="claimed">Claimed</option>
              </select>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
              {Object.entries(CATEGORIES).map(([cat,{icon}])=>(
                <button key={cat} onClick={()=>setFilterCat(c=>c===cat?"all":cat)} className="btn btn-ghost btn-sm" style={{whiteSpace:"nowrap",color:filterCat===cat?"var(--amber)":"var(--text2)",borderColor:filterCat===cat?"rgba(79,140,255,0.4)":"var(--border)",background:filterCat===cat?"rgba(79,140,255,0.08)":"transparent"}}>
                  {icon} {cat}
                </button>
              ))}
            </div>
            <div style={{fontSize:13,color:"var(--text3)",marginBottom:12}}>
              Showing <strong style={{color:"var(--text)"}}>{filtered.length}</strong> items
            </div>
            {filtered.length===0 ? (
              <div style={{textAlign:"center",padding:"60px 20px"}}>
                <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,marginBottom:8}}>No items found</div>
                <div style={{fontSize:14,color:"var(--text3)",marginBottom:16}}>Try adjusting filters or post a new item</div>
                <button className="btn btn-amber" onClick={()=>setShowPost(true)}><Icon n="plus" size={14}/> Post Item</button>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
                {filtered.map(item=>(
                  <ItemCard key={item.id} item={item} onClick={()=>setSelectedItem(item)} bookmarked={bookmarks.includes(item.id)} onBookmark={toggleBookmark}/>
                ))}
              </div>
            )}
          </div>
        )}
        {page==="match" && <div className="fade-in" style={{maxWidth:700,margin:"0 auto"}}><AIMatchPanel items={items} currentUser={currentUser} toast={showToast}/></div>}
        {page==="leaderboard" && <div className="fade-in" style={{maxWidth:600,margin:"0 auto"}}><Leaderboard currentUser={currentUser}/></div>}
        {page==="admin" && currentUser.role==="admin" && <div className="fade-in" style={{maxWidth:700,margin:"0 auto"}}><AdminPanel items={items} claims={claims} onApprove={handleApproveClaim} onReject={handleRejectClaim} onClearFlag={handleClearFlag} toast={showToast}/></div>}
      </main>
      {selectedItem && <ItemDetailModal item={selectedItem} onClose={()=>setSelectedItem(null)} currentUser={currentUser} onClaim={handleClaim} onReport={(id)=>setItems(prev=>prev.map(i=>i.id===id?{...i,suspiciousFlag:true,status:"pending"}:i))} toast={showToast}/>}
      {showPost && <PostItemForm onClose={()=>setShowPost(false)} onPost={handlePost} currentUser={currentUser} toast={showToast}/>}
      {toast && <Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <footer style={{padding:"16px 24px",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:12,color:"var(--text3)"}}>
        <span>uniFind Campus · Signed in as <strong style={{color:"var(--text2)"}}>{currentUser.name}</strong></span>
        <button className="btn btn-ghost btn-sm" onClick={onLogout}>Sign Out</button>
      </footer>
    </div>
  );
};

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <GlobalStyles/>
      {!currentUser ? <LandingPage onLogin={setCurrentUser}/> : <Dashboard currentUser={currentUser} onLogout={()=>setCurrentUser(null)}/>}
    </>
  );
}
