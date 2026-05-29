/*
Improved Infinite Scroll Control - Usability Test Prototype
Version 2

Purpose:
  A more user-friendly prototype for comparing:
  1. Infinite Scroll
  2. Pagination
  3. Load More

Main improvements from Version 1:
  - Cleaner UI with a left-side study control panel and right-side prototype area
  - Clearer task instructions with progress indicators
  - More difficult and realistic tasks
  - More content cards, so the target is not immediately obvious
  - "Mark Interesting" button for Browse task
  - Return task requires the participant to move away before returning
  - Automatic quantitative logging for time, success, viewed cards, opened cards, wrong opens,
    scroll distance, page changes, load-more clicks, auto-loads, interesting cards, and ratings
  - CSV/JSON export

How to run:
  1. Create an HTML file with:
       <div id="app"></div>
       <script src="improved_infinite_scroll_study_prototype.js"></script>
  2. Put this JS file and the HTML file in the same folder.
  3. Open the HTML file in a browser.
*/

(function () {
    "use strict";

    /***********************
     * STUDY CONTENT
     ***********************/
    const BASE_TITLES = [
        ["Healthy Meal Prep Ideas", "Food", "Simple weekly meal ideas for busy students."],
        ["Budget Travel Tips", "Travel", "How to plan a trip without overspending."],
        ["Best Study Apps", "School", "Tools that help with notes, reminders, and focus."],
        ["Beginner Workout Plan", "Fitness", "A simple routine for people starting exercise."],
        ["Coffee Shops Near Campus", "Local", "Places to study, relax, and meet friends."],
        ["Laptop Buying Guide", "Technology", "Things to compare before buying a laptop."],
        ["Summer Outfit Ideas", "Lifestyle", "Comfortable outfit ideas for warm weather."],
        ["Productivity Tools", "Productivity", "Apps and habits for planning tasks better."],
        ["Easy Dinner Recipes", "Food", "Quick meals that take less than 30 minutes."],
        ["Weekend Hiking Spots", "Travel", "Nearby trails for a short outdoor trip."],
        ["Note Taking Methods", "School", "Different ways to organize lecture notes."],
        ["Home Desk Setup", "Technology", "Ideas for a comfortable study desk."],
        ["Grocery Budget Planner", "Finance", "How to plan meals and reduce grocery costs."],
        ["Campus Event Calendar", "Local", "Find activities happening this month."],
        ["Beginner Yoga Routine", "Fitness", "Short stretches for stress relief."],
        ["Scholarship Search Tips", "School", "How to organize applications and deadlines."],
        ["Used Car Checklist", "Shopping", "What to check before buying a used car."],
        ["Simple Breakfast Ideas", "Food", "Fast breakfast choices for busy mornings."],
        ["Time Blocking Guide", "Productivity", "Plan your day using structured time blocks."],
        ["Online Safety Basics", "Technology", "Protect accounts, passwords, and personal data."],
        ["Rainy Day Activities", "Lifestyle", "Indoor activities for bad weather days."],
        ["Resume Improvement Tips", "Career", "Small changes that make resumes easier to read."],
        ["Interview Practice Guide", "Career", "Common questions and preparation strategies."],
        ["Apartment Search Checklist", "Housing", "What to compare before choosing an apartment."],
        ["Public Transit Guide", "Local", "How to plan routes around the city."],
        ["Affordable Gift Ideas", "Shopping", "Low-cost gift ideas for friends and family."],
        ["Morning Routine Builder", "Lifestyle", "Create a routine that helps start the day."],
        ["Stress Management Tips", "Wellness", "Simple ways to manage school and work stress."],
        ["Group Project Planner", "School", "Coordinate tasks and deadlines with teammates."],
        ["Portfolio Website Basics", "Career", "How to present projects online."],
        ["Healthy Snack List", "Food", "Easy snacks for studying or working."],
        ["Phone Photography Tips", "Technology", "Improve photos using simple composition rules."],
        ["Room Organization Ideas", "Housing", "Make a small room easier to use."],
        ["Saving Money Challenge", "Finance", "A simple plan to save small amounts weekly."],
        ["Fitness Progress Tracker", "Fitness", "Track workouts and weekly progress."],
        ["Local Museum Guide", "Local", "Interesting museums to visit nearby."],
        ["Meal Planning for Beginners", "Food", "How to plan simple meals for the week."],
        ["Travel Packing Checklist", "Travel", "Items to remember before a short trip."],
        ["Focus Music Playlist", "Productivity", "Music ideas for studying and deep work."],
        ["Study Break Ideas", "Wellness", "Short breaks that help avoid burnout."],
        ["Internship Search Plan", "Career", "Organize applications and follow-up dates."],
        ["Textbook Savings Tips", "Finance", "Ways to spend less on school materials."],
        ["Beginner Coding Practice", "Technology", "Small coding exercises for beginners."],
        ["Healthy Sleep Habits", "Wellness", "Improve sleep with simple routine changes."],
        ["Weekly Cleaning Plan", "Housing", "Keep a living space organized with small tasks."],
        ["Local Food Trucks", "Local", "Casual food options around the city."],
        ["Financial Aid Reminder", "Finance", "Keep track of forms and deadlines."],
        ["Simple Coding Portfolio", "Career", "Show small projects in a professional way."],
        ["Beginner Running Plan", "Fitness", "A gentle plan for building running stamina."],
        ["Weekend Movie List", "Lifestyle", "Movies to watch during a relaxed weekend."],
        ["Digital Calendar Setup", "Productivity", "Organize deadlines and appointments."],
        ["Cheap Lunch Ideas", "Food", "Affordable lunch ideas for school or work."],
        ["Apartment Move-In Tips", "Housing", "What to prepare before moving."],
        ["Beginner Budget Worksheet", "Finance", "Track income, spending, and savings."],
        ["Public Speaking Practice", "School", "Practice confidence for class presentations."],
        ["Portfolio Photo Tips", "Career", "Make project images easier to understand."],
        ["Local Volunteer Options", "Local", "Community activities and volunteer work."],
        ["Winter Travel Safety", "Travel", "Prepare for cold weather travel."],
        ["Group Chat Etiquette", "Lifestyle", "Communicate better in team chats."],
        ["Quick Stretch Routine", "Fitness", "Short movement breaks during studying."],
        ["Cloud Storage Comparison", "Technology", "Compare storage tools for school files."],
        ["Exam Week Planning", "School", "Plan studying, sleeping, and breaks."],
        ["Roommate Agreement Tips", "Housing", "Avoid conflict by setting expectations."],
        ["Farmer Market Guide", "Local", "Find affordable fresh food nearby."],
        ["Emergency Fund Basics", "Finance", "Start saving for unexpected expenses."],
        ["Personal Website Checklist", "Career", "What to include on a student website."],
        ["Budget Grocery Recipes", "Food", "Low-cost recipes for weekly meals."],
        ["Weekend Road Trip Plan", "Travel", "Plan a short trip with friends."],
        ["Simple Habit Tracker", "Productivity", "Track small daily habits."],
        ["Mindful Breathing Exercise", "Wellness", "Short breathing exercise for stress."],
        ["Used Furniture Checklist", "Shopping", "Check quality before buying used furniture."],
        ["Desk Ergonomics Guide", "Technology", "Improve comfort during computer work."],
        ["Class Registration Tips", "School", "Plan schedule and backup classes."],
        ["Local Library Services", "Local", "Study rooms, printing, and resources."],
        ["Career Fair Preparation", "Career", "Prepare questions and resume copies."],
        ["Weekly Fitness Schedule", "Fitness", "Plan workouts around school and work."],
        ["Room Lighting Ideas", "Housing", "Improve room comfort with lighting."],
        ["Travel Budget Calculator", "Finance", "Estimate trip costs before booking."],
        ["Short Video Editing Tips", "Technology", "Basic editing for social videos."],
        ["Healthy Dessert Ideas", "Food", "Simple desserts with lighter ingredients."],
        ["Study Group Rules", "School", "Make study groups more useful."],
        ["Local Park Guide", "Local", "Outdoor places for walking and relaxing."],
        ["Morning Focus Checklist", "Productivity", "Prepare for a focused morning."],
        ["Job Application Tracker", "Career", "Track applications and follow-ups."],
        ["Affordable Room Decor", "Shopping", "Decorate a small room on a budget."],
        ["Beginner Strength Training", "Fitness", "Simple strength routine for beginners."],
        ["Weekend Self-Care Plan", "Wellness", "Plan rest and recovery time."],
        ["Travel Document Reminder", "Travel", "Keep travel documents organized."],
        ["Student Discount List", "Finance", "Find discounts for students."],
        ["Simple Pasta Recipes", "Food", "Easy pasta meals for weeknights."],
        ["Local Study Spots", "Local", "Quiet places for focused studying."],
        ["Coding Interview Basics", "Career", "Practice common coding interview topics."],
        ["Small Closet Organization", "Housing", "Organize clothes in a small space."]
    ];

    const CARDS = BASE_TITLES.map((row, index) => ({
        id: index + 1,
        title: row[0],
        category: row[1],
        description: row[2],
        readingTime: 2 + (index % 6),
        popularity: 50 + ((index * 7) % 50),
        tag: ["Beginner", "Guide", "Checklist", "Tips", "Ideas"][index % 5]
    }));

    /***********************
     * SETTINGS
     ***********************/
    const STORAGE_KEY = "improved_infinite_scroll_control_records_v2";
    const BATCH_SIZE = 12;

    const PATTERNS = {
        infinite: "Infinite Scroll",
        pagination: "Pagination",
        loadmore: "Load More"
    };

    const TASKS = {
        browse: {
            label: "Task 1: Browse and Select",
            shortLabel: "Browse",
            targetTitle: "",
            instruction:
                "Browse naturally for 2 minutes. Mark 3 cards that look interesting. You may open cards before marking them.",
            successRule: "Success = participant marks at least 3 interesting cards.",
            minInteresting: 3,
            minCardsBeforeReturn: 0
        },
        find: {
            label: "Task 2: Find a Specific Card",
            shortLabel: "Find",
            targetTitle: "Travel Budget Calculator",
            instruction:
                "Find and open the card titled “Travel Budget Calculator.” Do not use browser search. Navigate only through the interface.",
            successRule: "Success = participant opens the correct target card.",
            minInteresting: 0,
            minCardsBeforeReturn: 0
        },
        return: {
            label: "Task 3: Return to a Previous Card",
            shortLabel: "Return",
            targetTitle: "Healthy Sleep Habits",
            instruction:
                "First, find and open “Healthy Sleep Habits.” Then continue browsing until you have viewed at least 12 more cards. After that, return to “Healthy Sleep Habits” and open it again.",
            successRule: "Success = participant opens the target once, moves away, views 12 more cards, then opens the same target again.",
            minInteresting: 0,
            minCardsBeforeReturn: 12
        },
        stop: {
            label: "Task 4: Stop and Control",
            shortLabel: "Stop",
            targetTitle: "",
            instruction:
                "Imagine you are choosing useful student life resources. Browse until you feel you have seen enough options to make a decision. Then click “Complete Task.”",
            successRule: "Success = participant stops intentionally and explains why they stopped.",
            minInteresting: 0,
            minCardsBeforeReturn: 0
        }
    };

    /***********************
     * STATE
     ***********************/
    const state = {
        pattern: "infinite",
        task: "browse",
        participantId: "",
        visibleCount: BATCH_SIZE,
        currentPage: 1,
        activeRecord: null,
        observer: null,
        modalCardId: null,
        lastScrollY: 0,
        lastDirection: null,
        timerId: null
    };

    /***********************
     * UTILS
     ***********************/
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => Array.from(document.querySelectorAll(selector));

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function nowISO() {
        return new Date().toISOString();
    }

    function sessionId() {
        const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
        return `S-${stamp}-${Math.random().toString(36).slice(2, 7)}`;
    }

    function secondsBetween(a, b) {
        return ((new Date(b).getTime() - new Date(a).getTime()) / 1000).toFixed(2);
    }

    function getRecords() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }

    function saveRecords(records) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }

    function addEvent(type, data = {}) {
        if (!state.activeRecord) return;
        state.activeRecord.eventLog.push({ timeISO: nowISO(), type, data });
    }

    function downloadFile(filename, text, mimeType) {
        const blob = new Blob([text], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    /***********************
     * UI
     ***********************/
    function injectStyles() {
        const style = document.createElement("style");
        style.textContent = `
      :root {
        --bg: #f4f6fb;
        --panel: #ffffff;
        --text: #182235;
        --muted: #687389;
        --line: #dce2ec;
        --primary: #315efb;
        --primary-dark: #2448c9;
        --success: #15803d;
        --danger: #b91c1c;
        --warning: #b45309;
        --soft-blue: #edf2ff;
        --soft-green: #ecfdf5;
        --soft-yellow: #fffbeb;
        --shadow: 0 10px 28px rgba(24, 34, 53, 0.08);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: Inter, Arial, Helvetica, sans-serif;
      }

      button, input, select, textarea {
        font: inherit;
      }

      button {
        border: none;
        border-radius: 12px;
        padding: 10px 13px;
        font-weight: 700;
        cursor: pointer;
        background: #eef1f7;
        color: var(--text);
      }

      button:hover { filter: brightness(0.97); }

      button.primary { background: var(--primary); color: white; }
      button.primary:hover { background: var(--primary-dark); }
      button.success { background: var(--success); color: white; }
      button.danger { background: var(--danger); color: white; }
      button.warning { background: var(--warning); color: white; }

      input, select, textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: white;
        padding: 10px 12px;
        color: var(--text);
      }

      textarea {
        min-height: 74px;
        resize: vertical;
      }

      label {
        display: block;
        font-size: 13px;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .app-shell {
        display: grid;
        grid-template-columns: 360px 1fr;
        min-height: 100vh;
      }

      .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: auto;
        padding: 18px;
        background: var(--panel);
        border-right: 1px solid var(--line);
      }

      .main {
        padding: 24px;
      }

      .brand {
        margin-bottom: 16px;
      }

      .brand h1 {
        margin: 0;
        font-size: 23px;
        line-height: 1.15;
      }

      .brand p {
        margin: 8px 0 0;
        color: var(--muted);
        line-height: 1.4;
        font-size: 14px;
      }

      .panel {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 16px;
        box-shadow: var(--shadow);
        margin-bottom: 16px;
      }

      .sidebar .panel {
        box-shadow: none;
        border-radius: 16px;
      }

      .panel h2 {
        margin: 0 0 12px;
        font-size: 17px;
      }

      .field {
        margin-bottom: 12px;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .task-card {
        border: 1px solid var(--line);
        background: var(--soft-blue);
        border-radius: 16px;
        padding: 14px;
        line-height: 1.45;
      }

      .task-card h3 {
        margin: 0 0 6px;
        font-size: 16px;
      }

      .task-card p {
        margin: 5px 0;
        color: #334155;
        font-size: 14px;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 999px;
        padding: 6px 10px;
        background: #eef1f7;
        font-size: 13px;
        font-weight: 800;
      }

      .status-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #94a3b8;
      }

      .status-dot.running { background: var(--success); }
      .status-dot.saved { background: var(--primary); }

      .metrics {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 16px;
      }

      .metric {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 14px;
        box-shadow: var(--shadow);
      }

      .metric-value {
        font-size: 24px;
        font-weight: 900;
      }

      .metric-label {
        color: var(--muted);
        font-size: 13px;
        margin-top: 3px;
      }

      .prototype-header {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: flex-start;
      }

      .prototype-header h2 {
        margin: 0;
        font-size: 26px;
      }

      .prototype-header p {
        margin: 5px 0 0;
        color: var(--muted);
      }

      .progress-box {
        margin-top: 14px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      .progress-item {
        background: #f8fafc;
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 10px;
      }

      .progress-item strong {
        display: block;
        margin-bottom: 2px;
      }

      .progress-item span {
        color: var(--muted);
        font-size: 13px;
      }

      .content-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin: 14px 0;
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 12px;
        box-shadow: var(--shadow);
      }

      .search-note {
        color: var(--muted);
        font-size: 14px;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
        gap: 14px;
      }

      .content-card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 14px;
        box-shadow: var(--shadow);
        min-height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.12s ease, border-color 0.12s ease;
      }

      .content-card:hover {
        transform: translateY(-2px);
        border-color: #b8c3d6;
      }

      .fake-image {
        height: 72px;
        border-radius: 16px;
        background:
          radial-gradient(circle at 20% 20%, rgba(49, 94, 251, 0.25), transparent 30%),
          linear-gradient(135deg, #eef2ff, #f8fafc);
        margin-bottom: 12px;
      }

      .card-topline {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 4px 9px;
        font-size: 12px;
        font-weight: 800;
        background: #eef1f7;
        color: #334155;
      }

      .badge.target-visible {
        background: var(--soft-yellow);
        color: #92400e;
      }

      .content-card h3 {
        margin: 0 0 7px;
        font-size: 18px;
      }

      .content-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.4;
        font-size: 14px;
      }

      .card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 12px 0;
      }

      .card-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .pagination {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        margin: 20px 0;
      }

      .page-btn.active {
        background: var(--primary);
        color: white;
      }

      .load-more-area {
        display: flex;
        justify-content: center;
        padding: 24px;
      }

      .records-table-wrap {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        font-size: 13px;
      }

      th, td {
        border: 1px solid var(--line);
        padding: 8px 9px;
        text-align: left;
        vertical-align: top;
      }

      th {
        background: #f8fafc;
      }

      .modal-backdrop {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(15, 23, 42, 0.55);
        padding: 24px;
        z-index: 999;
      }

      .modal {
        width: min(560px, 100%);
        background: white;
        border-radius: 22px;
        padding: 20px;
        box-shadow: 0 30px 90px rgba(0,0,0,0.25);
      }

      .modal h2 {
        margin: 8px 0 8px;
      }

      .modal p {
        color: var(--muted);
        line-height: 1.45;
      }

      .small {
        font-size: 13px;
        color: var(--muted);
      }

      .hidden { display: none !important; }

      @media (max-width: 980px) {
        .app-shell { grid-template-columns: 1fr; }
        .sidebar {
          position: static;
          height: auto;
          border-right: none;
          border-bottom: 1px solid var(--line);
        }
        .metrics { grid-template-columns: repeat(2, 1fr); }
        .progress-box { grid-template-columns: 1fr; }
      }
    `;
        document.head.appendChild(style);
    }

    function buildUI() {
        const root = document.getElementById("app") || document.body;
        root.innerHTML = `
      <div class="app-shell">
        <aside class="sidebar">
          <div class="brand">
            <h1>Infinite Scroll Control Study</h1>
            <p>Controlled prototype for comparing browsing flow, findability, return behavior, and stopping control.</p>
          </div>

          <section class="panel">
            <h2>1. Setup</h2>
            <div class="field">
              <label for="participantId">Participant ID</label>
              <input id="participantId" placeholder="Example: P1" />
            </div>

            <div class="field">
              <label for="patternSelect">Interaction Pattern</label>
              <select id="patternSelect">
                <option value="infinite">Infinite Scroll</option>
                <option value="pagination">Pagination</option>
                <option value="loadmore">Load More</option>
              </select>
            </div>

            <div class="field">
              <label for="taskSelect">Task</label>
              <select id="taskSelect">
                <option value="browse">Task 1: Browse and Select</option>
                <option value="find">Task 2: Find a Specific Card</option>
                <option value="return">Task 3: Return to Previous Card</option>
                <option value="stop">Task 4: Stop and Control</option>
              </select>
            </div>

            <div class="button-row">
              <button class="primary" id="startBtn">Start Task</button>
              <button class="success" id="completeBtn">Complete Task</button>
              <button class="danger" id="failBtn">Mark Failure</button>
            </div>
          </section>

          <section class="panel">
            <h2>2. Current Task</h2>
            <div class="task-card" id="taskInstruction"></div>
          </section>

          <section class="panel">
            <h2>3. Ratings After Task</h2>
            <div class="field">
              <label for="controlRating">Control rating</label>
              <select id="controlRating">
                <option value="">Select</option>
                <option value="1">1 - Very low control</option>
                <option value="2">2 - Low control</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High control</option>
                <option value="5">5 - Very high control</option>
              </select>
            </div>
            <div class="field">
              <label for="findabilityRating">Findability rating</label>
              <select id="findabilityRating">
                <option value="">Select</option>
                <option value="1">1 - Very difficult</option>
                <option value="2">2 - Difficult</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - Easy</option>
                <option value="5">5 - Very easy</option>
              </select>
            </div>
            <div class="field">
              <label for="satisfactionRating">Satisfaction rating</label>
              <select id="satisfactionRating">
                <option value="">Select</option>
                <option value="1">1 - Very low</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Very high</option>
              </select>
            </div>
            <div class="field">
              <label for="notes">Observation notes / participant quote</label>
              <textarea id="notes" placeholder="Example: Participant said: 'I know I saw it, but I do not know where it went.'"></textarea>
            </div>
          </section>

          <section class="panel">
            <h2>4. Export Data</h2>
            <div class="button-row">
              <button id="exportCsvBtn" class="primary">Export CSV</button>
              <button id="exportJsonBtn">Export JSON</button>
              <button id="clearDataBtn" class="danger">Clear</button>
            </div>
          </section>
        </aside>

        <main class="main">
          <section class="panel">
            <div class="prototype-header">
              <div>
                <h2 id="prototypeTitle">Infinite Scroll</h2>
                <p id="prototypeSubtitle">Same content cards. Only the navigation pattern changes.</p>
              </div>
              <div>
                <span class="status-pill"><span id="statusDot" class="status-dot"></span><span id="statusText">Not started</span></span>
              </div>
            </div>

            <div class="progress-box">
              <div class="progress-item">
                <strong id="progressTarget">Target: None</strong>
                <span>Current task target</span>
              </div>
              <div class="progress-item">
                <strong id="progressRule">Success rule</strong>
                <span>How the task is judged</span>
              </div>
              <div class="progress-item">
                <strong id="progressReturn">Return progress: N/A</strong>
                <span>Only used in return task</span>
              </div>
            </div>
          </section>

          <section class="metrics">
            <div class="metric">
              <div id="metricTime" class="metric-value">0.0s</div>
              <div class="metric-label">Time</div>
            </div>
            <div class="metric">
              <div id="metricViewed" class="metric-value">0</div>
              <div class="metric-label">Unique cards viewed</div>
            </div>
            <div class="metric">
              <div id="metricOpened" class="metric-value">0</div>
              <div class="metric-label">Cards opened</div>
            </div>
            <div class="metric">
              <div id="metricErrors" class="metric-value">0</div>
              <div class="metric-label">Wrong opens</div>
            </div>
          </section>

          <section class="content-toolbar">
            <div>
              <strong id="toolbarTitle">Content List</strong>
              <div class="search-note" id="toolbarNote">
                Browser search is not allowed during tasks.
              </div>
            </div>
            <button id="resetViewBtn">Reset View</button>
          </section>

          <section id="cards" class="cards-grid"></section>
          <section id="pagination" class="pagination"></section>
          <section id="loadMoreArea" class="load-more-area"></section>

          <section class="panel">
            <h2>Saved Study Records</h2>
            <div id="recordsTable" class="records-table-wrap"></div>
          </section>
        </main>
      </div>

      <div id="modalRoot"></div>
    `;
    }

    /***********************
     * RECORDING
     ***********************/
    function createRecord() {
        const task = TASKS[state.task];
        return {
            sessionId: sessionId(),
            participantId: $("#participantId").value.trim(),
            pattern: state.pattern,
            patternLabel: PATTERNS[state.pattern],
            task: state.task,
            taskLabel: task.label,
            targetTitle: task.targetTitle,
            startTimeISO: nowISO(),
            endTimeISO: "",
            durationSeconds: "",
            success: "",
            failureReason: "",

            uniqueCardsViewed: 0,
            cardIdsViewed: [],
            cardsOpened: 0,
            wrongCardOpens: 0,
            targetOpens: 0,
            interestingMarked: 0,
            interestingCardIds: [],

            pageChanges: 0,
            loadMoreClicks: 0,
            infiniteAutoLoads: 0,
            scrollDistancePx: 0,
            maxScrollDepthPx: 0,
            scrollDirectionChanges: 0,

            returnFirstTargetOpened: false,
            cardsViewedAfterFirstTarget: 0,
            returnRequirementMet: false,
            returnSecondTargetOpened: false,

            stopLocation: "",
            controlRating: "",
            findabilityRating: "",
            satisfactionRating: "",
            notes: "",
            eventLog: []
        };
    }

    function startTask() {
        const pid = $("#participantId").value.trim();
        if (!pid) {
            alert("Please enter a Participant ID first, such as P1.");
            return;
        }

        if (state.activeRecord) {
            const ok = confirm("A task is already running. Save or discard it before starting a new task. Start over and discard current task?");
            if (!ok) return;
        }

        resetRatings();
        resetView();

        state.activeRecord = createRecord();
        state.lastScrollY = window.scrollY;
        state.lastDirection = null;

        setStatus("Running", "running");
        addEvent("task_started", { pattern: state.pattern, task: state.task });
        renderCards();
        updateProgress();
        updateMetrics();
    }

    function completeTask(success = true, reason = "") {
        if (!state.activeRecord) {
            alert("No active task is running.");
            return;
        }

        const task = TASKS[state.task];

        if (success && state.task === "browse" && state.activeRecord.interestingMarked < task.minInteresting) {
            const ok = confirm("The participant has not marked 3 interesting cards yet. Complete anyway?");
            if (!ok) return;
        }

        if (success && state.task === "return" && !state.activeRecord.returnSecondTargetOpened) {
            const ok = confirm("The return task has not met the full success rule yet. Complete anyway?");
            if (!ok) return;
        }

        if (success && state.task === "stop" && !$("#notes").value.trim()) {
            const ok = confirm("For the stop task, add a short note about why the participant stopped. Complete anyway?");
            if (!ok) return;
        }

        const record = state.activeRecord;
        record.endTimeISO = nowISO();
        record.durationSeconds = secondsBetween(record.startTimeISO, record.endTimeISO);
        record.success = success ? "Yes" : "No";
        record.failureReason = reason;
        record.stopLocation = getStopLocation();
        record.controlRating = $("#controlRating").value;
        record.findabilityRating = $("#findabilityRating").value;
        record.satisfactionRating = $("#satisfactionRating").value;
        record.notes = $("#notes").value.trim();

        addEvent(success ? "task_completed_success" : "task_completed_failure", { reason });

        const records = getRecords();
        records.push(record);
        saveRecords(records);

        state.activeRecord = null;
        setStatus("Saved", "saved");
        renderRecords();
        updateMetrics();
        disconnectObserver();
        alert("Task saved. Choose the next task or pattern.");
    }

    function markFailure() {
        if (!state.activeRecord) {
            alert("No active task is running.");
            return;
        }
        const reason = prompt("Reason for failure, for example: gave up, could not locate target, got confused.");
        completeTask(false, reason || "Marked as failure by observer.");
    }

    function resetRatings() {
        $("#controlRating").value = "";
        $("#findabilityRating").value = "";
        $("#satisfactionRating").value = "";
        $("#notes").value = "";
    }

    function setStatus(text, mode) {
        $("#statusText").textContent = text;
        $("#statusDot").className = "status-dot";
        if (mode) $("#statusDot").classList.add(mode);
    }

    /***********************
     * TASK LOGIC
     ***********************/
    function handleOpen(card) {
        if (!state.activeRecord) return;

        const task = TASKS[state.task];
        const isTarget = task.targetTitle && card.title === task.targetTitle;

        state.activeRecord.cardsOpened += 1;

        if (task.targetTitle) {
            if (isTarget) {
                state.activeRecord.targetOpens += 1;
            } else {
                state.activeRecord.wrongCardOpens += 1;
            }
        }

        addEvent("card_opened", { cardId: card.id, title: card.title, isTarget });

        if (state.task === "find" && isTarget) {
            completeTask(true, "Target card opened.");
            return;
        }

        if (state.task === "return" && isTarget) {
            if (!state.activeRecord.returnFirstTargetOpened) {
                state.activeRecord.returnFirstTargetOpened = true;
                state.activeRecord.cardsViewedAfterFirstTarget = 0;
                addEvent("return_first_target_opened", { cardId: card.id });
                updateProgress();
                setTimeout(() => {
                    alert("Good. Now browse away and view at least 12 more cards. Then return to this card and open it again.");
                }, 100);
            } else if (state.activeRecord.returnRequirementMet && !state.activeRecord.returnSecondTargetOpened) {
                state.activeRecord.returnSecondTargetOpened = true;
                addEvent("return_second_target_opened", { cardId: card.id });
                updateProgress();
                completeTask(true, "Participant returned to the original card.");
            } else if (!state.activeRecord.returnRequirementMet) {
                alert("They found it again, but they need to view at least 12 more cards before returning.");
            }
        }

        updateProgress();
        updateMetrics();
    }

    function markInteresting(cardId) {
        if (!state.activeRecord) {
            alert("Start a task first.");
            return;
        }

        const record = state.activeRecord;
        if (!record.interestingCardIds.includes(cardId)) {
            record.interestingCardIds.push(cardId);
            record.interestingMarked = record.interestingCardIds.length;
            addEvent("marked_interesting", { cardId });
        }

        if (state.task === "browse" && record.interestingMarked >= TASKS.browse.minInteresting) {
            updateProgress();
        }

        renderCards();
        updateMetrics();
    }

    function recordCardViewed(cardId) {
        if (!state.activeRecord) return;
        const record = state.activeRecord;

        if (!record.cardIdsViewed.includes(cardId)) {
            record.cardIdsViewed.push(cardId);
            record.uniqueCardsViewed = record.cardIdsViewed.length;
            addEvent("card_viewed", { cardId });

            if (state.task === "return" && record.returnFirstTargetOpened && !record.returnSecondTargetOpened) {
                const targetCard = CARDS.find(c => c.title === TASKS.return.targetTitle);
                if (targetCard && cardId !== targetCard.id) {
                    record.cardsViewedAfterFirstTarget += 1;
                    if (record.cardsViewedAfterFirstTarget >= TASKS.return.minCardsBeforeReturn) {
                        record.returnRequirementMet = true;
                    }
                }
            }

            updateProgress();
            updateMetrics();
        }
    }

    /***********************
     * RENDERING
     ***********************/
    function resetView() {
        state.visibleCount = BATCH_SIZE;
        state.currentPage = 1;
        window.scrollTo({ top: 0, behavior: "instant" });
        renderCards();
    }

    function getVisibleCards() {
        if (state.pattern === "pagination") {
            const start = (state.currentPage - 1) * BATCH_SIZE;
            return CARDS.slice(start, start + BATCH_SIZE);
        }
        return CARDS.slice(0, state.visibleCount);
    }

    function renderTaskInstruction() {
        const task = TASKS[state.task];
        $("#taskInstruction").innerHTML = `
      <h3>${escapeHtml(task.label)}</h3>
      <p>${escapeHtml(task.instruction)}</p>
      <p><strong>Success rule:</strong> ${escapeHtml(task.successRule)}</p>
    `;
        updateProgress();
    }

    function renderHeader() {
        $("#prototypeTitle").textContent = PATTERNS[state.pattern];
        $("#prototypeSubtitle").textContent = `Testing ${PATTERNS[state.pattern]} with the same ${CARDS.length} content cards.`;
        $("#toolbarTitle").textContent = `${PATTERNS[state.pattern]} Content List`;
    }

    function renderCards() {
        renderHeader();

        const visibleCards = getVisibleCards();
        const targetTitle = TASKS[state.task].targetTitle;

        $("#cards").innerHTML = visibleCards.map(card => {
            const marked = state.activeRecord && state.activeRecord.interestingCardIds.includes(card.id);
            const targetBadge = targetTitle && card.title === targetTitle ? `<span class="badge target-visible">Target card</span>` : "";
            return `
        <article class="content-card" data-card-id="${card.id}">
          <div>
            <div class="fake-image"></div>
            <div class="card-topline">
              <span class="badge">${escapeHtml(card.category)}</span>
              ${targetBadge}
            </div>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.description)}</p>
            <div class="card-meta">
              <span class="badge">${escapeHtml(card.tag)}</span>
              <span class="badge">${card.readingTime} min</span>
              <span class="badge">${card.popularity}% match</span>
            </div>
          </div>
          <div class="card-actions">
            <button class="primary open-btn" data-card-id="${card.id}">Open</button>
            <button class="interesting-btn" data-card-id="${card.id}">${marked ? "Marked ✓" : "Mark Interesting"}</button>
          </div>
        </article>
      `;
        }).join("");

        $$(".open-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const card = CARDS.find(c => c.id === Number(btn.dataset.cardId));
                if (card) {
                    handleOpen(card);
                    showModal(card);
                }
            });
        });

        $$(".interesting-btn").forEach(btn => {
            btn.addEventListener("click", () => markInteresting(Number(btn.dataset.cardId)));
        });

        renderNavigationControls();
        setupObserver();
    }

    function renderNavigationControls() {
        $("#pagination").innerHTML = "";
        $("#loadMoreArea").innerHTML = "";

        if (state.pattern === "pagination") {
            const pageCount = Math.ceil(CARDS.length / BATCH_SIZE);
            $("#pagination").innerHTML = Array.from({ length: pageCount }, (_, i) => {
                const page = i + 1;
                return `<button class="page-btn ${page === state.currentPage ? "active" : ""}" data-page="${page}">${page}</button>`;
            }).join("");

            $$(".page-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const page = Number(btn.dataset.page);
                    if (page !== state.currentPage) {
                        state.currentPage = page;
                        if (state.activeRecord) {
                            state.activeRecord.pageChanges += 1;
                            addEvent("page_changed", { page });
                        }
                        window.scrollTo({ top: 0, behavior: "instant" });
                        renderCards();
                        updateMetrics();
                    }
                });
            });
        }

        if (state.pattern === "loadmore") {
            if (state.visibleCount < CARDS.length) {
                $("#loadMoreArea").innerHTML = `<button id="loadMoreBtn" class="primary">Load More Cards</button>`;
                $("#loadMoreBtn").addEventListener("click", () => {
                    state.visibleCount = Math.min(state.visibleCount + BATCH_SIZE, CARDS.length);
                    if (state.activeRecord) {
                        state.activeRecord.loadMoreClicks += 1;
                        addEvent("load_more_clicked", { visibleCount: state.visibleCount });
                    }
                    renderCards();
                    updateMetrics();
                });
            } else {
                $("#loadMoreArea").innerHTML = `<span class="small">End of list</span>`;
            }
        }
    }

    function disconnectObserver() {
        if (state.observer) state.observer.disconnect();
        state.observer = null;
    }

    function setupObserver() {
        disconnectObserver();
        state.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    recordCardViewed(Number(entry.target.dataset.cardId));
                }
            });
        }, { threshold: 0.55 });

        $$(".content-card").forEach(card => state.observer.observe(card));
    }

    function showModal(card) {
        $("#modalRoot").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal">
          <div class="fake-image"></div>
          <span class="badge">${escapeHtml(card.category)}</span>
          <h2>${escapeHtml(card.title)}</h2>
          <p>${escapeHtml(card.description)}</p>
          <p class="small">Card ID: ${card.id} • ${card.readingTime} min read • ${card.popularity}% match</p>
          <div class="button-row">
            <button class="primary" id="closeModalBtn">Close</button>
          </div>
        </div>
      </div>
    `;
        $("#closeModalBtn").addEventListener("click", () => $("#modalRoot").innerHTML = "");
    }

    function updateProgress() {
        const task = TASKS[state.task];
        $("#progressTarget").textContent = task.targetTitle ? `Target: ${task.targetTitle}` : "Target: None";
        $("#progressRule").textContent = task.shortLabel;

        if (!state.activeRecord) {
            $("#progressReturn").textContent = state.task === "return" ? "Return progress: not started" : "Return progress: N/A";
            return;
        }

        if (state.task === "browse") {
            $("#progressRule").textContent = `Marked: ${state.activeRecord.interestingMarked}/3 interesting cards`;
        }

        if (state.task === "return") {
            const r = state.activeRecord;
            let text = "Return progress: ";
            if (!r.returnFirstTargetOpened) {
                text += "find target first";
            } else if (!r.returnRequirementMet) {
                text += `${r.cardsViewedAfterFirstTarget}/12 cards viewed after target`;
            } else if (!r.returnSecondTargetOpened) {
                text += "requirement met, return to target";
            } else {
                text += "completed";
            }
            $("#progressReturn").textContent = text;
        } else {
            $("#progressReturn").textContent = "Return progress: N/A";
        }
    }

    function updateMetrics() {
        if (!state.activeRecord) {
            $("#metricTime").textContent = "0.0s";
            $("#metricViewed").textContent = "0";
            $("#metricOpened").textContent = "0";
            $("#metricErrors").textContent = "0";
            return;
        }

        const r = state.activeRecord;
        $("#metricTime").textContent = `${secondsBetween(r.startTimeISO, nowISO())}s`;
        $("#metricViewed").textContent = r.uniqueCardsViewed;
        $("#metricOpened").textContent = r.cardsOpened;
        $("#metricErrors").textContent = r.wrongCardOpens;
    }

    function getStopLocation() {
        if (state.pattern === "pagination") return `Page ${state.currentPage}`;
        const batches = Math.ceil(state.visibleCount / BATCH_SIZE);
        if (state.pattern === "loadmore") return `After ${batches} loaded batch(es)`;
        if (state.pattern === "infinite") return `After ${batches} visible batch(es)`;
        return "";
    }

    /***********************
     * SCROLLING
     ***********************/
    function handleScroll() {
        if (state.pattern === "infinite" && state.visibleCount < CARDS.length) {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
            if (nearBottom) {
                state.visibleCount = Math.min(state.visibleCount + BATCH_SIZE, CARDS.length);
                if (state.activeRecord) {
                    state.activeRecord.infiniteAutoLoads += 1;
                    addEvent("infinite_auto_loaded", { visibleCount: state.visibleCount });
                }
                renderCards();
            }
        }

        if (!state.activeRecord) return;

        const y = window.scrollY;
        const delta = Math.abs(y - state.lastScrollY);

        if (delta > 0) {
            state.activeRecord.scrollDistancePx += delta;
            state.activeRecord.maxScrollDepthPx = Math.max(state.activeRecord.maxScrollDepthPx, y);

            const direction = y > state.lastScrollY ? "down" : "up";
            if (state.lastDirection && state.lastDirection !== direction) {
                state.activeRecord.scrollDirectionChanges += 1;
                addEvent("scroll_direction_changed", { direction });
            }
            state.lastDirection = direction;
            state.lastScrollY = y;
        }
    }

    /***********************
     * EXPORT + RECORDS TABLE
     ***********************/
    function recordsToCsv(records) {
        const columns = [
            "sessionId", "participantId", "patternLabel", "taskLabel", "targetTitle",
            "startTimeISO", "endTimeISO", "durationSeconds", "success", "failureReason",
            "uniqueCardsViewed", "cardsOpened", "wrongCardOpens", "targetOpens",
            "interestingMarked", "pageChanges", "loadMoreClicks", "infiniteAutoLoads",
            "scrollDistancePx", "maxScrollDepthPx", "scrollDirectionChanges",
            "returnFirstTargetOpened", "cardsViewedAfterFirstTarget", "returnRequirementMet", "returnSecondTargetOpened",
            "stopLocation", "controlRating", "findabilityRating", "satisfactionRating", "notes",
            "cardIdsViewed", "interestingCardIds"
        ];

        const header = columns.join(",");
        const rows = records.map(record => columns.map(col => {
            const value = Array.isArray(record[col]) ? record[col].join("|") : (record[col] ?? "");
            return `"${String(value).replaceAll('"', '""')}"`;
        }).join(","));

        return [header, ...rows].join("\n");
    }

    function exportCsv() {
        const records = getRecords();
        if (!records.length) {
            alert("No saved data yet.");
            return;
        }
        downloadFile("improved_infinite_scroll_control_data.csv", recordsToCsv(records), "text/csv");
    }

    function exportJson() {
        const records = getRecords();
        if (!records.length) {
            alert("No saved data yet.");
            return;
        }
        downloadFile("improved_infinite_scroll_control_data.json", JSON.stringify(records, null, 2), "application/json");
    }

    function clearData() {
        if (!confirm("Clear all saved records from this browser?")) return;
        localStorage.removeItem(STORAGE_KEY);
        renderRecords();
    }

    function renderRecords() {
        const records = getRecords();
        if (!records.length) {
            $("#recordsTable").innerHTML = `<p class="small">No saved records yet.</p>`;
            return;
        }

        $("#recordsTable").innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Participant</th>
            <th>Pattern</th>
            <th>Task</th>
            <th>Time</th>
            <th>Success</th>
            <th>Viewed</th>
            <th>Opened</th>
            <th>Errors</th>
            <th>Interesting</th>
            <th>Control</th>
            <th>Findability</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(r => `
            <tr>
              <td>${escapeHtml(r.participantId)}</td>
              <td>${escapeHtml(r.patternLabel)}</td>
              <td>${escapeHtml(r.taskLabel)}</td>
              <td>${escapeHtml(r.durationSeconds)}s</td>
              <td>${escapeHtml(r.success)}</td>
              <td>${escapeHtml(r.uniqueCardsViewed)}</td>
              <td>${escapeHtml(r.cardsOpened)}</td>
              <td>${escapeHtml(r.wrongCardOpens)}</td>
              <td>${escapeHtml(r.interestingMarked)}</td>
              <td>${escapeHtml(r.controlRating)}</td>
              <td>${escapeHtml(r.findabilityRating)}</td>
              <td>${escapeHtml(r.notes)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    }

    /***********************
     * EVENTS
     ***********************/
    function bindEvents() {
        $("#patternSelect").addEventListener("change", e => {
            state.pattern = e.target.value;
            resetView();
            renderHeader();
            updateProgress();
        });

        $("#taskSelect").addEventListener("change", e => {
            state.task = e.target.value;
            resetView();
            renderTaskInstruction();
            updateProgress();
        });

        $("#startBtn").addEventListener("click", startTask);
        $("#completeBtn").addEventListener("click", () => completeTask(true, "Observer completed task."));
        $("#failBtn").addEventListener("click", markFailure);
        $("#resetViewBtn").addEventListener("click", resetView);

        $("#exportCsvBtn").addEventListener("click", exportCsv);
        $("#exportJsonBtn").addEventListener("click", exportJson);
        $("#clearDataBtn").addEventListener("click", clearData);

        window.addEventListener("scroll", handleScroll, { passive: true });

        state.timerId = setInterval(updateMetrics, 300);
    }

    /***********************
     * INIT
     ***********************/
    function init() {
        injectStyles();
        buildUI();
        bindEvents();
        renderTaskInstruction();
        renderHeader();
        renderCards();
        renderRecords();
        setStatus("Not started", "");
        updateProgress();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
