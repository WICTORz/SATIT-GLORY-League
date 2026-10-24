<!DOCTYPE html>
<html lang="th" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>SATIT Glory League SS2 - Powered by WICTORz</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#10b981',
                        darkbg: '#0f172a',
                        cardbg: '#1e293b',
                    }
                }
            }
        }
    </script>
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts (Prompt) -->
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Prompt', sans-serif; }
        .safe-bottom { padding-bottom: env(safe-area-inset-bottom, 20px); }
        .safe-top { padding-top: env(safe-area-inset-top, 20px); }
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
    </style>
</head>
<body class="bg-darkbg text-slate-100 min-h-screen flex flex-col items-center justify-center antialiased selection:bg-emerald-500 selection:text-white">

    <!-- Mobile Device Frame Container -->
    <div id="app-container" class="w-full max-w-md bg-darkbg min-h-screen sm:min-h-[850px] sm:max-h-[920px] sm:rounded-3xl sm:shadow-2xl sm:border-4 sm:border-slate-700 flex flex-col relative overflow-hidden">

        <!-- Top Navigation Bar -->
        <header class="bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-800 safe-top px-4 py-3 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <button onclick="toggleSidebar()" class="text-slate-300 hover:text-emerald-400 focus:outline-none p-1 text-lg">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <h1 class="font-bold text-base tracking-wide bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    SATIT Glory League
                </h1>
            </div>
            <div class="flex items-center space-x-3">
                <!-- Admin Mode Gear -->
                <button onclick="openAdminModal()" id="admin-gear-btn" class="text-slate-300 hover:text-emerald-400 relative p-1.5 rounded-lg hover:bg-slate-800 transition" title="Admin Mode">
                    <i class="fa-solid fa-gear"></i>
                    <span id="admin-indicator" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-slate-600 rounded-full"></span>
                </button>
                <!-- Notification Bell -->
                <div class="relative">
                    <button onclick="toggleNotifications()" class="text-slate-300 hover:text-emerald-400 relative p-1.5 rounded-lg hover:bg-slate-800 transition">
                        <i class="fa-solid fa-bell"></i>
                        <span id="notif-badge" class="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">3</span>
                    </button>
                    <!-- Notification Popover -->
                    <div id="notif-popover" class="hidden absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs">
                        <div class="p-3 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
                            <span class="font-semibold text-slate-200"><i class="fa-solid fa-bell text-emerald-400 mr-1.5"></i> การแจ้งเตือน (Real-time)</span>
                            <button onclick="markAllNotificationsRead()" class="text-emerald-400 hover:underline">อ่านทั้งหมด</button>
                        </div>
                        <div id="notif-list" class="max-h-64 overflow-y-auto divide-y divide-slate-700/50">
                            <!-- Populated dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Slide-out Drawer Menu (Sidebar) -->
        <div id="sidebar-backdrop" onclick="toggleSidebar()" class="fixed inset-0 bg-black/60 z-50 hidden transition-opacity"></div>
        <aside id="sidebar" class="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800 z-50 transform -translate-x-full transition-transform duration-300 flex flex-col">
            <div class="p-4 border-b border-slate-800 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">S2</div>
                    <span class="font-bold text-sm">Navigation Menu</span>
                </div>
                <button onclick="toggleSidebar()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-1.5 text-sm">
                <button onclick="switchTab('home'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-house w-5 text-emerald-400"></i><span>1. หน้าแรก (Home)</span></button>
                <button onclick="switchTab('standings'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-trophy w-5 text-amber-400"></i><span>2. ตารางคะแนน (Standings)</span></button>
                <button onclick="switchTab('fixtures'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-calendar-days w-5 text-cyan-400"></i><span>3. โปรแกรมการแข่งขัน</span></button>
                <button onclick="switchTab('topstats'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-futbol w-5 text-rose-400"></i><span>4. ดาวซัลโว & แอสซิสต์</span></button>
                <button onclick="switchTab('teams'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-shield-halved w-5 text-blue-400"></i><span>5. ทีม (12 Teams)</span></button>
                <button onclick="switchTab('players-reg'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition admin-only-nav"><i class="fa-solid fa-user-plus w-5 text-purple-400"></i><span>6. ลงทะเบียนนักเตะ (Admin)</span></button>
                <button onclick="switchTab('playerstats'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-id-card w-5 text-emerald-300"></i><span>7. ข้อมูลส่วนตัวนักเตะ</span></button>
                <button onclick="switchTab('fees'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-money-bill-wave w-5 text-amber-300"></i><span>8. ค่าสนาม & ใบเหลือง-แดง</span></button>
                <button onclick="switchTab('wictorz'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-star w-5 text-yellow-400"></i><span>9. WICTORz Weekly Points</span></button>
                <button onclick="switchTab('contact'); toggleSidebar();" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition"><i class="fa-solid fa-envelope w-5 text-indigo-400"></i><span>10. ติดต่อเรา & สมัคร SS3</span></button>
            </div>
            <div class="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
                Powered by WICTORz • Version 1.0.11
            </div>
        </aside>

        <!-- Main Dynamic View Area -->
        <main id="main-content" class="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            <!-- Content injected via JS -->
        </main>

        <!-- Bottom Navigation Bar -->
        <nav class="bg-slate-900/95 backdrop-blur-md absolute bottom-0 left-0 right-0 border-t border-slate-800 safe-bottom px-6 py-2 flex items-center justify-around z-40">
            <button onclick="switchTab('home')" id="nav-btn-home" class="flex flex-col items-center text-slate-400 hover:text-emerald-400 transition">
                <i class="fa-solid fa-house text-lg"></i>
                <span class="text-[10px] mt-1 font-medium">หน้าแรก</span>
            </button>
            <button onclick="switchTab('standings')" id="nav-btn-standings" class="flex flex-col items-center text-slate-400 hover:text-emerald-400 transition">
                <i class="fa-solid fa-trophy text-lg"></i>
                <span class="text-[10px] mt-1 font-medium">ตารางคะแนน</span>
            </button>
            <button onclick="toggleSidebar()" class="flex flex-col items-center text-slate-400 hover:text-emerald-400 transition">
                <i class="fa-solid fa-bars-staggered text-lg"></i>
                <span class="text-[10px] mt-1 font-medium">เมนู</span>
            </button>
        </nav>
    </div>

    <!-- Admin Login Modal -->
    <div id="admin-modal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-slate-800 border border-slate-700 w-full max-w-xs rounded-2xl p-5 shadow-2xl space-y-4">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-sm text-emerald-400"><i class="fa-solid fa-shield-halved mr-2"></i>Admin Mode Access</h3>
                <button onclick="closeAdminModal()" class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div id="admin-modal-body">
                <!-- If logged out -->
                <div id="admin-login-form" class="space-y-3">
                    <p class="text-xs text-slate-300">กรุณากรอกรหัสผ่าน Admin เพื่อเข้าสู่โหมดจัดการข้อมูล:</p>
                    <input type="password" id="admin-pass-input" placeholder="Password (124578963)" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500">
                    <div id="admin-error" class="text-rose-400 text-[11px] hidden">รหัสผ่านไม่ถูกต้อง!</div>
                    <button onclick="verifyAdminPassword()" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl text-xs transition">ยืนยัน Log In</button>
                </div>
                <!-- If logged in -->
                <div id="admin-logout-view" class="space-y-3 hidden">
                    <p class="text-xs text-emerald-400 font-medium"><i class="fa-solid fa-circle-check mr-1"></i> เข้าสู่ Admin Mode สำเร็จแล้ว</p>
                    <button onclick="logoutAdmin()" class="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 rounded-xl text-xs transition">Log Out (ออกจากระบบ)</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript Application Logic -->
    <script>
        // --- State Management ---
        let isAdmin = false;
        let currentTab = 'home';
        let notifications = [
            { id: 1, text: "วันนี้มีการแข่งขัน จะเริ่มขึ้นเวลา 18.43น. ขอให้ท่านเช็คโปรแกรมและเตรียมตัวให้ดี! ขอให้โชคดี", time: "อาทิตย์ 08:00 น.", read: false },
            { id: 2, text: "ภาพถ่ายแข่งขันในสัปดาห์นี้ ลงในเพจเสร็จสิ้นแล้ว! ตามด้วยวันเวลา 21:30 น.", time: "11 ต.ค. 2569", read: false },
            { id: 3, text: "จบการแข่งขัน! ทีม ท่าแพ เอฟซี 2 – 0 Class of 62 CMU", time: "11 ต.ค. 2569", read: false }
        ];

        // 12 Teams Data
        let teams = [
            { id: 1, name: "ท่าแพ เอฟซี", short: "ท่าแพ", played: 6, won: 5, drawn: 0, lost: 1, gf: 13, ga: 2, pts: 15, style: "บุกแหลก", status: "ดีเยี่ยม", slogan: "เจ้าถิ่นเขดขาม" },
            { id: 2, name: "เรย์ ลิออน", short: "REY LEON", played: 6, won: 4, drawn: 0, lost: 2, gf: 10, ga: 7, pts: 12, style: "ครองบอล", status: "ดี", slogan: "ราชสีห์แห่งสนาม" },
            { id: 3, name: "บังฮิมรอน", short: "บังฮิมรอน", played: 6, won: 3, drawn: 1, lost: 2, gf: 16, ga: 7, pts: 10, style: "สมดุล", status: "ดี", slogan: "เกมรุกดุดัน" },
            { id: 4, name: "เสี่ยคอมxบัดดี้ เอฟซี", short: "Buddy Fc", played: 6, won: 2, drawn: 1, lost: 3, gf: 7, ga: 9, pts: 7, style: "สวนกลับ", status: "ปานกลาง", slogan: "สู้ไม่ถอย" },
            { id: 5, name: "อัลฟ่า ฟุตบอลคลับ", short: "ALPHA FC", played: 6, won: 3, drawn: 0, lost: 3, gf: 13, ga: 10, pts: 9, style: "เพลสซิ่ง", status: "ดี", slogan: "ผู้นำเกม" },
            { id: 6, name: "โตต้า เอฟซี", short: "TOTA FC", played: 6, won: 4, drawn: 0, lost: 2, gf: 11, ga: 8, pts: 12, style: "ต่อบอล", status: "ดีเยี่ยม", slogan: "โตต้าคว้าชัย" },
            { id: 7, name: "บ้านสวนมีชัยxมีจักรกรุ๊ป", short: "บ้านสวนมีชัยฯ", played: 6, won: 0, drawn: 2, lost: 4, gf: 2, ga: 11, pts: 2, style: "เน้นรับบ้าง", status: "พอใช้", slogan: "เก๋าเกม" },
            { id: 8, name: "ช้างน้อย", short: "ช้างน้อย", played: 6, won: 4, drawn: 1, lost: 1, gf: 13, ga: 4, pts: 13, style: "ไดเรค", status: "ดีเยี่ยม", slogan: "ช้างศึกคะนอง" },
            { id: 9, name: "วัยรุ่นน้ำท่อม", short: "วัยรุ่นน้ำท่อม", played: 6, won: 0, drawn: 0, lost: 6, gf: 2, ga: 22, pts: 0, style: "รัดกุม", status: "มาตรฐาน", slogan: "ใจเกินร้อย" },
            { id: 10, name: "กรณ์ดอกไม้สด", short: "กรณ์ดอกไม้สด", played: 6, won: 4, drawn: 1, lost: 1, gf: 15, ga: 4, pts: 13, style: "ทีมเวิร์ค", status: "ดีเยี่ยม", slogan: "ดอกไม้บานสะพรั่ง" },
            { id: 11, name: "คลาฟออฟ 62 ซีเอ็มยู", short: "Class of 62", played: 6, won: 2, drawn: 1, lost: 3, gf: 7, ga: 9, pts: 7, style: "ยืดหยุ่น", status: "ปานกลาง", slogan: "ตำนานรุ่น 62" },
            { id: 12, name: "ฟีนิกส์", short: "PHOENIX", played: 6, won: 4, drawn: 0, lost: 2, gf: 9, ga: 6, pts: 12, style: "รุก", status: "ดี", slogan: "นกอมตะ" }
        ];

        // Match Results (Weeks 1-6) & Fixtures (Weeks 8-11)
        let matchesData = {
            week6: [
                { id: 61, t1: "บ้านสวนมีชัยฯ", t2: "กรณ์ดอกไม้สด", s1: 1, s2: 2, status: "FT" },
                { id: 62, t1: "PHOENIX", t2: "เสี่ยคอมxBuddy Fc", s1: 3, s2: 1, status: "FT" },
                { id: 63, t1: "TOTA FC", t2: "ช้างน้อย", s1: 1, s2: 2, status: "FT" },
                { id: 64, t1: "ALPHA FC", t2: "REY LEON", s1: 0, s2: 2, status: "FT" },
                { id: 65, t1: "บังฮิมรอน", t2: "วัยรุ่นน้ำท่อม", s1: 5, s2: 0, status: "FT" },
                { id: 66, t1: "ท่าแพ เอฟซี", t2: "Class of 62", s1: 2, s2: 0, status: "FT" }
            ],
            week8: [
                { id: 81, t1: "REY LEON", t2: "Class of 62 CMU", s1: "-", s2: "-", status: "LIVE" },
                { id: 82, t1: "กรณ์ดอกไม้สด", t2: "TOTA FC", s1: "-", s2: "-", status: "" },
                { id: 83, t1: "ช้างน้อย", t2: "บังฮิมรอน", s1: "-", s2: "-", status: "" },
                { id: 84, t1: "เสี่ยคอม x Buddy FC", t2: "ALPHA FC", s1: "-", s2: "-", status: "" },
                { id: 85, t1: "บ้านสวนมีชัย", t2: "PHOENIX", s1: "-", s2: "-", status: "" },
                { id: 86, t1: "วัยรุ่นน้ำท่อม", t2: "ท่าแพ เอฟซี", s1: "-", s2: "-", status: "" }
            ]
        };

        // Fees Data (12 teams, Weeks 1-11 + total)
        let feesData = Array.from({length: 12}, (_, i) => ({
            team: teams[i].name,
            weeks: Array(11).fill('จ่ายแล้วสด (750฿)'),
            yellowFines: 0,
            redFines: 0,
            drinks: 0
        }));

        // --- Initialization ---
        window.onload = function() {
            renderCurrentTab();
            updateNotificationBadge();
            startCountdownTimer();
        };

        function switchTab(tabName) {
            currentTab = tabName;
            renderCurrentTab();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- Admin Mode Functions ---
        function openAdminModal() {
            document.getElementById('admin-modal').classList.remove('hidden');
            if (isAdmin) {
                document.getElementById('admin-login-form').classList.add('hidden');
                document.getElementById('admin-logout-view').classList.remove('hidden');
            } else {
                document.getElementById('admin-login-form').classList.remove('hidden');
                document.getElementById('admin-logout-view').classList.add('hidden');
            }
        }

        function closeAdminModal() {
            document.getElementById('admin-modal').classList.add('hidden');
        }

        function verifyAdminPassword() {
            const pass = document.getElementById('admin-pass-input').value;
            if (pass === '124578963') {
                isAdmin = true;
                document.getElementById('admin-indicator').className = 'absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse';
                closeAdminModal();
                renderCurrentTab();
                alert('เข้าสู่ Admin Mode สำเร็จ!');
            } else {
                document.getElementById('admin-error').classList.remove('hidden');
            }
        }

        function logoutAdmin() {
            isAdmin = false;
            document.getElementById('admin-indicator').className = 'absolute -top-1 -right-1 w-2.5 h-2.5 bg-slate-600 rounded-full';
            closeAdminModal();
            renderCurrentTab();
            alert('ออกจาก Admin Mode แล้ว');
        }

        // --- Notification Functions ---
        function toggleNotifications() {
            const popover = document.getElementById('notif-popover');
            popover.classList.toggle('hidden');
            renderNotificationsList();
        }

        function renderNotificationsList() {
            const listEl = document.getElementById('notif-list');
            listEl.innerHTML = '';
            notifications.forEach(n => {
                listEl.innerHTML += `
                    <div class="p-3 hover:bg-slate-700/50 transition">
                        <p class="text-slate-200">${n.text}</p>
                        <span class="text-[10px] text-slate-400 mt-1 block"><i class="fa-regular fa-clock mr-1"></i>${n.time}</span>
                    </div>
                `;
            });
        }

        function markAllNotificationsRead() {
            setTimeout(() => {
                notifications = [];
                updateNotificationBadge();
                document.getElementById('notif-popover').classList.add('hidden');
            }, 3000);
            alert('การแจ้งเตือนทั้งหมดจะถูกลบอัตโนมัติในอีก 3 วินาทีตามกำหนด...');
        }

        function updateNotificationBadge() {
            const badge = document.getElementById('notif-badge');
            if (notifications.length > 0) {
                badge.textContent = notifications.length;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        // --- Sidebar ---
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebar-backdrop');
            sidebar.classList.toggle('-translate-x-full');
            backdrop.classList.toggle('hidden');
        }

        // --- Countdown Timer ---
        function startCountdownTimer() {
            setInterval(() => {
                const now = new Date();
                // Target next Sunday 18:34
                const target = new Date();
                target.setHours(18, 34, 0, 0);
                // If today is Sunday past 18:34, target next Sunday
                let diff = target - now;
                if (diff < 0) diff += 7 * 24 * 60 * 60 * 1000;

                const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

                const timerEl = document.getElementById('countdown-timer');
                if (timerEl) {
                    timerEl.textContent = `${hours}:${minutes}:${seconds}`;
                }
            }, 1000);
        }

        // --- Render Views ---
        function renderCurrentTab() {
            const main = document.getElementById('main-content');
            
            // Highlight active bottom nav
            ['home', 'standings'].forEach(t => {
                const btn = document.getElementById(`nav-btn-${t}`);
                if (btn) {
                    if (currentTab === t) btn.classList.add('text-emerald-400');
                    else btn.classList.remove('text-emerald-400');
                }
            });

            switch(currentTab) {
                case 'home': renderHomeView(main); break;
                case 'standings': renderStandingsView(main); break;
                case 'fixtures': renderFixturesView(main); break;
                case 'topstats': renderTopStatsView(main); break;
                case 'teams': renderTeamsView(main); break;
                case 'players-reg': renderPlayersRegView(main); break;
                case 'playerstats': renderPlayerStatsView(main); break;
                case 'fees': renderFeesView(main); break;
                case 'wictorz': renderWictorzView(main); break;
                case 'contact': renderContactView(main); break;
                default: renderHomeView(main);
            }
        }

        // 1. Home View
        function renderHomeView(container) {
            container.innerHTML = `
                <!-- Matchday Live Banner -->
                <div class="bg-gradient-to-r from-emerald-900/80 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-lg space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                            <span>◎ Matchday Live! Next &gt;&gt;</span>
                        </span>
                        <span id="countdown-timer" class="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">18:34:00</span>
                    </div>
                    <p class="text-[11px] text-slate-300">
                        <i class="fa-solid fa-calendar-days text-emerald-400 mr-1.5"></i> วันอาทิตย์ที่ 25 ตุลาคม 2569 (วีกที่ 8)
                    </p>
                    <p class="text-[11px] text-slate-300">
                        <i class="fa-solid fa-whistle text-emerald-400 mr-1.5"></i> กรรมการ: Phongphat ChaKun'Ice และคณะ
                    </p>
                    <p class="text-[11px] text-slate-300">
                        <i class="fa-solid fa-location-dot text-emerald-400 mr-1.5"></i> สนามฟุตบอลหญ้าเทียม รร.สาธิต มช. (บอลชาย 7 คน S2)
                    </p>
                </div>

                <!-- Match Schedule Times Info -->
                <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-[11px] text-slate-300 space-y-1">
                    <div class="font-semibold text-emerald-400 mb-1"><i class="fa-regular fa-clock mr-1"></i> เวลาแข่งขัน (สัปดาห์ละ 6 คู่):</div>
                    <div class="grid grid-cols-3 gap-1 text-slate-400">
                        <div>คู่ 1: 18.34 น.</div>
                        <div>คู่ 2: 19.05 น.</div>
                        <div>คู่ 3: 19.37 น.</div>
                        <div>คู่ 4: 20.09 น.</div>
                        <div>คู่ 5: 20.40 น.</div>
                        <div>คู่ 6: 21.13 น.</div>
                    </div>
                </div>

                <!-- Matchday Results & Live Editing -->
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200 flex items-center justify-between">
                        <span><i class="fa-solid fa-futbol text-emerald-400 mr-2"></i> ผลการแข่งขันวีกปัจจุบัน (Week 8)</span>
                        ${isAdmin ? '<span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">Admin Editable</span>' : ''}
                    </h2>
                    
                    <div class="space-y-2">
                        ${matchesData.week8.map(m => `
                            <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow hover:border-emerald-500/50 transition">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-semibold w-1/3 text-right truncate pr-2">${m.t1}</span>
                                    <div class="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 flex items-center space-x-2">
                                        <span class="font-bold text-sm text-emerald-400">${m.s1}</span>
                                        <span class="text-xs text-slate-500">-</span>
                                        <span class="font-bold text-sm text-emerald-400">${m.s2}</span>
                                    </div>
                                    <span class="text-xs font-semibold w-1/3 truncate pl-2">${m.t2}</span>
                                </div>
                                <div class="mt-2 pt-2 border-t border-slate-700/50 flex justify-between items-center text-[10px] text-slate-400">
                                    <span class="${m.status === 'LIVE' ? 'text-rose-500 font-bold animate-pulse' : 'text-slate-400'}">
                                        ${m.status === 'LIVE' ? '◎ LIVE' : (m.status === 'FT' ? 'FT (จบการแข่งขัน)' : 'ยังไม่เริ่ม')}
                                    </span>
                                    ${isAdmin ? `<button onclick="alert('Admin สามารถบันทึกผู้ทำประตู แอสซิสต์ และใบเหลือง-แดงได้ที่นี่')" class="text-emerald-400 hover:underline"><i class="fa-solid fa-pen-to-square mr-1"></i>แก้ไขผลการแข่ง</button>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Mini Standings & Next Week Preview -->
                <div class="grid grid-cols-1 gap-3">
                    <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
                        <h3 class="font-bold text-xs text-emerald-400"><i class="fa-solid fa-table-list mr-1.5"></i> ตารางคะแนนย่อ (Top 6)</h3>
                        <div class="space-y-1 text-xs">
                            ${teams.slice(0, 6).map((t, idx) => `
                                <div class="flex justify-between items-center py-1 border-b border-slate-700/40">
                                    <span class="text-slate-300"><span class="font-bold text-emerald-400 mr-2">${idx+1}.</span>${t.name}</span>
                                    <span class="font-bold text-emerald-400">${t.pts} pts</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Photo Upload Status & Facebook Link -->
                <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold text-slate-200"><i class="fa-solid fa-camera text-cyan-400 mr-1.5"></i> สถานะภาพถ่ายสัปดาห์นี้:</span>
                        <span class="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded text-[10px]">อัพโหลดลงเพจเรียบร้อยแล้ว</span>
                    </div>
                    <p class="text-[11px] text-slate-400">ติดตามภาพการแข่งขันและข่าวสารทั้งหมดได้ที่:</p>
                    <a href="https://www.facebook.com/profile.php?id=100090974629841" target="_blank" class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-xs">
                        <i class="fa-brands fa-facebook mr-1.5"></i> ไปที่เพจ Facebook ทางการ
                    </a>
                </div>
            `;
        }

        // 2. Standings View
        function renderStandingsView(container) {
            // Sort teams by Points, then GD, then GF
            const sortedTeams = [...teams].sort((a,b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga) || b.gf - a.gf);
            
            container.innerHTML = `
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-trophy text-amber-400 mr-2"></i> ตารางคะแนนแบบเรียลไทม์ (Live Standings)</h2>
                        <span class="text-[10px] text-slate-400">12 ทีม Season 2</span>
                    </div>
                    
                    <div class="overflow-x-auto bg-slate-800 border border-slate-700 rounded-2xl shadow">
                        <table class="w-full text-left text-xs whitespace-nowrap">
                            <thead class="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-700">
                                <tr>
                                    <th class="p-2.5 text-center">อันดับ</th>
                                    <th class="p-2.5">ทีม</th>
                                    <th class="p-2.5 text-center">แข่ง</th>
                                    <th class="p-2.5 text-center">ได้-เสีย</th>
                                    <th class="p-2.5 text-center">GD</th>
                                    <th class="p-2.5 text-center font-bold text-emerald-400">แต้ม</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-700/50">
                                ${sortedTeams.map((t, idx) => {
                                    let rowBg = '';
                                    if (idx === 0) rowBg = 'bg-emerald-950/30';
                                    else if (idx >= 1 && idx <= 3) rowBg = 'bg-cyan-950/20';
                                    else if (idx >= 4 && idx <= 7) rowBg = 'bg-blue-950/20';

                                    return `
                                        <tr class="${rowBg} hover:bg-slate-700/40 transition">
                                            <td class="p-2.5 text-center font-bold text-slate-300">${idx+1}</td>
                                            <td class="p-2.5 font-medium text-slate-100 flex items-center space-x-2">
                                                <span>${t.name}</span>
                                            </td>
                                            <td class="p-2.5 text-center text-slate-300">${t.played}</td>
                                            <td class="p-2.5 text-center text-slate-300">${t.gf}-${t.ga}</td>
                                            <td class="p-2.5 text-center font-mono ${t.gf - t.ga >= 0 ? 'text-emerald-400' : 'text-rose-400'}">${t.gf - t.ga > 0 ? '+' + (t.gf - t.ga) : t.gf - t.ga}</td>
                                            <td class="p-2.5 text-center font-bold text-emerald-400">${t.pts}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Prize Notes -->
                    <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-[11px] text-slate-300 space-y-1">
                        <div class="font-semibold text-amber-400 mb-1"><i class="fa-solid fa-medal mr-1"></i> เงินรางวัลการแข่งขัน:</div>
                        <p>• อันดับ 1: 10,000฿ | อันดับ 2: 4,000฿ | อันดับ 3: 2,700฿ | อันดับ 4: 1,500฿</p>
                        <p>• อันดับ 5: 800฿ | อันดับ 6, 7, 8: ทีมละ 500฿</p>
                    </div>
                </div>
            `;
        }

        // 3. Fixtures View
        function renderFixturesView(container) {
            container.innerHTML = `
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-calendar-days text-cyan-400 mr-2"></i> โปรแกรมการแข่งขัน (Weeks 8 - 11)</h2>
                    
                    <div class="space-y-4 text-xs">
                        <!-- Week 8 -->
                        <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
                            <div class="font-bold text-emerald-400 border-b border-slate-700 pb-1.5"><i class="fa-solid fa-circle-play mr-1"></i> วีกที่ 8 (อาทิตย์ที่ 25 ตุลาคม 2569)</div>
                            ${matchesData.week8.map((m, i) => `
                                <div class="flex justify-between items-center py-1 border-b border-slate-700/40 last:border-0">
                                    <span class="text-slate-400 font-mono text-[10px]">8/${i+1}</span>
                                    <span class="text-slate-200 font-medium">${m.t1}</span>
                                    <span class="text-emerald-400 font-bold">vs</span>
                                    <span class="text-slate-200 font-medium">${m.t2}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Week 9 -->
                        <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
                            <div class="font-bold text-cyan-400 border-b border-slate-700 pb-1.5"><i class="fa-solid fa-calendar mr-1"></i> วีกที่ 9 (อาทิตย์ที่ 1 พฤศจิกายน 2569)</div>
                            <div class="text-slate-300 space-y-1">
                                <div>9/1 TOTA FC พบ บังฮิมรอน</div>
                                <div>9/2 กรณ์ดอกไม้สด พบ PHOENIX</div>
                                <div>9/3 เสี่ยคอม x Buddy FC พบ Class of 62 CMU</div>
                                <div>9/4 บ้านสวนมีชัย พบ ALPHA FC</div>
                                <div>9/5 ช้างน้อย พบ ท่าแพ เอฟซี</div>
                                <div>9/6 วัยรุ่นน้ำท่อม พบ REY LEON</div>
                            </div>
                        </div>

                        <!-- Week 10 -->
                        <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
                            <div class="font-bold text-amber-400 border-b border-slate-700 pb-1.5"><i class="fa-solid fa-calendar mr-1"></i> วีกที่ 10 (อาทิตย์ที่ 8 พฤศจิกายน 2569)</div>
                            <div class="text-slate-300 space-y-1">
                                <div>10/1 PHOENIX พบ ALPHA FC</div>
                                <div>10/2 กรณ์ดอกไม้สด พบ บังฮิมรอน</div>
                                <div>10/3 ช้างน้อย พบ REY LEON</div>
                                <div>10/4 TOTA FC พบ ท่าแพ เอฟซี</div>
                                <div>10/5 บ้านสวนมีชัย พบ Class of 62 CMU</div>
                                <div>10/6 เสี่ยคอม x Buddy FC พบ วัยรุ่นน้ำท่อม</div>
                            </div>
                        </div>

                        <!-- Week 11 -->
                        <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2">
                            <div class="font-bold text-rose-400 border-b border-slate-700 pb-1.5"><i class="fa-solid fa-flag-checkered mr-1"></i> วีกที่ 11 สัปดาห์สุดท้าย (15 พฤศจิกายน 2569)</div>
                            <div class="text-slate-300 space-y-1">
                                <div>11/1 บังฮิมรอน พบ REY LEON</div>
                                <div>11/2 TOTA FC พบ เสี่ยคอม x Buddy FC</div>
                                <div>11/3 กรณ์ดอกไม้สด พบ ท่าแพ เอฟซี</div>
                                <div>11/4 ALPHA FC พบ Class of 62 CMU</div>
                                <div>11/5 บ้านสวนมีชัย พบ ช้างน้อย</div>
                                <div>11/6 PHOENIX พบ วัยรุ่นน้ำท่อม</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // 4. Top Scorers & Assists View
        function renderTopStatsView(container) {
            container.innerHTML = `
                <div class="space-y-4">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-futbol text-rose-400 mr-2"></i> ดาวซัลโว และ แอสซิสต์ (Top Scorers & Assists)</h2>
                    
                    <!-- Top Scorers -->
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-2 text-xs">
                        <div class="font-bold text-emerald-400 flex items-center"><i class="fa-solid fa-shoe-prints mr-2"></i> 1. ดาวซัลโว (Top Scorers)</div>
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-center py-1 border-b border-slate-700/50">
                                <span class="text-slate-200">1. รุ่งเรือง พรหมแดน</span>
                                <span class="text-slate-400">บังฮิมรอน</span>
                                <span class="font-bold text-emerald-400">12 ประตู</span>
                            </div>
                            <div class="flex justify-between items-center py-1 border-b border-slate-700/50">
                                <span class="text-slate-200">2. อาร์ม</span>
                                <span class="text-slate-400">ท่าแพ เอฟซี</span>
                                <span class="font-bold text-emerald-400">2 ประตู</span>
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="text-slate-200">3. คอม</span>
                                <span class="text-slate-400">ท่าแพ เอฟซี</span>
                                <span class="font-bold text-emerald-400">3 ประตู</span>
                            </div>
                        </div>
                    </div>

                    <!-- Top Assists -->
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-2 text-xs">
                        <div class="font-bold text-cyan-400 flex items-center"><i class="fa-solid fa-hands-holding-child mr-2"></i> 2. แอสซิสต์คิง (Top Assists)</div>
                        <div class="space-y-1.5">
                            <div class="flex justify-between items-center py-1 border-b border-slate-700/50">
                                <span class="text-slate-200">1. อรรถพล</span>
                                <span class="text-slate-400">บังฮิมรอน</span>
                                <span class="font-bold text-cyan-400">3 แอสซิสต์</span>
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="text-slate-200">2. คิม</span>
                                <span class="text-slate-400">ท่าแพ เอฟซี</span>
                                <span class="font-bold text-cyan-400">2 แอสซิสต์</span>
                            </div>
                        </div>
                    </div>

                    <!-- Weekly Winners -->
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-2 text-xs">
                        <div class="font-bold text-amber-400 flex items-center"><i class="fa-solid fa-crown mr-2"></i> 👑 WICTORz System Weekly Winners (WEEK 1-11)</div>
                        <p class="text-slate-300">ติดตามผลผู้ชนะนักเตะยอดเยี่ยมประจำสัปดาห์ (POTW) ได้ในระบบ WICTORz Weekly Points</p>
                    </div>
                </div>
            `;
        }

        // 5. Teams View
        function renderTeamsView(container) {
            container.innerHTML = `
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-shield-halved text-blue-400 mr-2"></i> รายชื่อ 12 ทีมที่เข้าร่วมการแข่งขัน</h2>
                    
                    <div class="grid grid-cols-1 gap-2.5">
                        ${teams.map((t, i) => `
                            <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 flex justify-between items-center">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">${i+1}</div>
                                    <div>
                                        <h4 class="font-semibold text-slate-100 text-xs">${t.name}</h4>
                                        <p class="text-[10px] text-slate-400">ฉายา: ${t.slogan} | สไตล์: ${t.style}</p>
                                    </div>
                                </div>
                                <span class="text-[10px] bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">${t.pts} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 6. Players Registration (Admin Only)
        function renderPlayersRegView(container) {
            if (!isAdmin) {
                container.innerHTML = `
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center space-y-3 mt-10">
                        <i class="fa-solid fa-lock text-3xl text-rose-500"></i>
                        <h3 class="font-bold text-sm text-slate-200">หน้านี้สำหรับ Admin เท่านั้น</h3>
                        <p class="text-xs text-slate-400">กรุณาคลิกที่ไอคอนฟันเฟืองด้านบนขวาและใส่รหัสผ่านเพื่อเข้าสู่ Admin Mode</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = `
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-user-plus text-purple-400 mr-2"></i> ลงทะเบียนนักเตะ (Admin Database)</h2>
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-3 text-xs">
                        <p class="text-slate-300">เพิ่ม / แก้ไข / ลบ ข้อมูลนักเตะในระบบฐานข้อมูล:</p>
                        <button onclick="alert('เพิ่มนักเตะสำเร็จ')" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl transition">+ เพิ่มนักเตะใหม่เข้าทีม</button>
                    </div>
                </div>
            `;
        }

        // 7. Player Personal Stats View
        function renderPlayerStatsView(container) {
            container.innerHTML = `
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-id-card text-emerald-300 mr-2"></i> ข้อมูลส่วนตัวนักเตะและสถิติรายสัปดาห์</h2>
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-2 text-xs text-slate-300">
                        <p><strong class="text-emerald-400">(G)</strong> = ประตูทั่วไป / <strong class="text-emerald-400">(GF)</strong> = ฟรีคิก / <strong class="text-emerald-400">(SG)</strong> = นาทีบาป / <strong class="text-emerald-400">(WG)</strong> = ประตูตัดสินเกม</p>
                        <p><strong class="text-emerald-400">PoW</strong> = ติดทีมยอดเยี่ยมสัปดาห์ | <strong class="text-emerald-400">TOP 1-3</strong> = ฟอร์มยอดเยี่ยมประจำทีม</p>
                    </div>
                </div>
            `;
        }

        // 8. Match Fees & Fines View
        function renderFeesView(container) {
            container.innerHTML = `
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-money-bill-wave text-amber-300 mr-2"></i> ค่าสนาม และค่าปรับ (Match Fees & Fines)</h2>
                    <div class="overflow-x-auto bg-slate-800 border border-slate-700 rounded-2xl shadow">
                        <table class="w-full text-left text-xs whitespace-nowrap">
                            <thead class="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-700">
                                <tr>
                                    <th class="p-2.5">ทีม</th>
                                    <th class="p-2.5 text-center">สถานะค่าสนาม (สัปดาห์ล่าสุด)</th>
                                    <th class="p-2.5 text-center">ค้างชำระ / ค่าปรับ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-700/50">
                                ${feesData.map(f => `
                                    <tr class="hover:bg-slate-700/40 transition">
                                        <td class="p-2.5 font-medium text-slate-100">${f.team}</td>
                                        <td class="p-2.5 text-center text-emerald-400">จ่ายแล้วสด (750฿)</td>
                                        <td class="p-2.5 text-center text-slate-300">0฿</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // 9. WICTORz System Weekly Points View
        function renderWictorzView(container) {
            container.innerHTML = `
                <div class="space-y-3">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-star text-yellow-400 mr-2"></i> WICTORz’s System Weekly Points (Rules & Scoreboard)</h2>
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-2 text-xs text-slate-300">
                        <p class="font-semibold text-emerald-400">เกณฑ์การให้คะแนนผู้เล่นประจำสัปดาห์:</p>
                        <p>• ลงเล่น (Appearance): +3 pt สำหรับทุกคน</p>
                        <p>• ชนะปกติ: +1 pt | ชนะห่าง 3 ประตู (Big Win): +2 pt | ชนะ 4 ประตูขึ้นไป: +4 pt</p>
                        <p>• ประตูกองหน้า +3 pt | ริมเส้น +3.5 pt | กองกลาง +3.75 pt | กองหลัง +4 pt | ผู้รักษาประตู +5 pt</p>
                        <p>• คลีนชีต กองหลัง +2 pt | ริมเส้น +1 pt | กองกลาง +0.25 pt</p>
                    </div>
                </div>
            `;
        }

        // 10. Contact Us & Registration View
        function renderContactView(container) {
            container.innerHTML = `
                <div class="space-y-4">
                    <h2 class="font-bold text-sm text-slate-200"><i class="fa-solid fa-envelope text-indigo-400 mr-2"></i> ติดต่อเรา & สมัครเข้าร่วมแข่งขัน Season 3</h2>
                    
                    <!-- Contact Form -->
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-3 text-xs">
                        <div class="font-semibold text-emerald-400">ส่งข้อความถึง Admin:</div>
                        <input type="text" placeholder="ชื่อ / ชื่อทีมของคุณ" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500">
                        <textarea placeholder="ข้อความ / ร้องขอ / แจ้งเลื่อนคู่แข่ง (ก่อน 2 วันขึ้นไป)" rows="3" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"></textarea>
                        <button onclick="alert('ส่งข้อความถึง Admin เรียบร้อยแล้ว')" class="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl transition">ส่งข้อความ</button>
                    </div>

                    <!-- SS3 Registration Form -->
                    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 space-y-3 text-xs">
                        <div class="font-semibold text-cyan-400">ขอเข้าร่วมการแข่งขัน SATIT GLORY League Season 3 (2027):</div>
                        <input type="text" placeholder="ชื่อทีม" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500">
                        <input type="text" placeholder="เบอร์โทรศัพท์ติดต่อ" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500">
                        <div class="space-y-1">
                            <label class="flex items-center space-x-2 text-slate-300">
                                <input type="checkbox" class="rounded bg-slate-900 border-slate-700 text-cyan-500">
                                <span>SATIT GLORY League Season 3 : 2027 (เริ่ม ม.ค. 2027 ค่าแมตช์ 720฿)</span>
                            </label>
                            <label class="flex items-center space-x-2 text-slate-300">
                                <input type="checkbox" class="rounded bg-slate-900 border-slate-700 text-cyan-500">
                                <span>Crucible Trophy Saturday League 2027 (ค่าแมตช์ 675฿)</span>
                            </label>
                        </div>
                        <button onclick="alert('ลงทะเบียนสมัคร Season 3 สำเร็จ!')" class="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-2 rounded-xl transition">กดยืนยันสมัครแข่งขัน</button>
                    </div>

                    <div class="text-center text-[10px] text-slate-500 space-y-1">
                        <p>Powered by WICTORz สนใจจองสนามเตะปกติหรือแข่งขันโทร 082-6924980</p>
                        <p>Version 1.0.11 • Copyright : Wictorz</p>
                    </div>
                </div>
            `;
        }
    </script>
</body>
</html>
