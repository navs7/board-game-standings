# 🎲 Board Game Standings Tracker

A real-time, mobile-friendly scoreboard system for tracking board game scores with a consolidated admin panel, public leaderboard display, and Google Sheets integration.

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time Leaderboard** - Live updating scoreboard with auto-refresh (3 seconds)
- **Consolidated Admin Panel** - Single-page interface for complete game management
- **Score Tracking** - Add and undo scores with full history
- **Timestamped Exports** - Archive games to Google Sheets with automatic formatting
- **Auto-Resume** - Continues existing game on page reload

### 🎨 User Experience
- **Mobile Responsive** - Works perfectly on all devices (phones, tablets, desktops)
- **Loading Animations** - Visual feedback for all operations
- **Error Handling** - Graceful failure with retry options
- **Smart Input Preservation** - Type scores without interruption
- **Keyboard Shortcuts** - Press Enter to submit scores

### ♿ Accessibility
- **ARIA Labels** - Full screen reader support
- **Keyboard Navigation** - Complete keyboard accessibility
- **Semantic HTML** - Proper document structure
- **High Contrast** - Readable colors and clear visual hierarchy

### 🔒 Security
- **Password Protection** - Optional admin page authentication
- **Session Management** - Auto-logout after 1 hour
- **Input Validation** - Client and server-side validation
- **XSS Prevention** - HTML escaping for user inputs

### 🎨 Design
- **Modern UI** - Dark theme with smooth animations
- **Professional Typography** - Monospace player names for scoreboard aesthetic
- **Color-Coded Feedback** - Green (success), Red (error), Blue (info)
- **Winner Highlighting** - Gold accent for first place
- **Loading States** - Shimmer effects and spinners

---

## 📁 Project Structure

```
board-game-standings/
├── index.html              # Public leaderboard (auto-refresh)
├── admin.html              # Admin panel (game management)
├── admin-protected.html    # Password-protected admin (optional)
│
├── style.css               # Public leaderboard styles
├── admin.css               # Admin panel styles
│
├── script.js               # Public leaderboard logic
├── admin.js                # Admin panel logic
├── utils.js                # Shared utilities & validation
├── config.js               # API configuration
│
├── updated-app-script.gs   # Google Apps Script backend
│
└── docs/
    ├── README.md                    # This file
    ├── SECURITY-GUIDE.md            # Security implementation guide
    ├── QUICK-SECURITY-SETUP.md      # Quick password setup
    ├── DEPLOYMENT-GUIDE.md          # Backend deployment guide
    ├── BACKEND-GUIDE.md             # Google Apps Script guide
    └── IMPROVEMENTS.md              # Recent improvements log
```

---

## 🚀 Quick Start

### Prerequisites
- Google Account (for Google Sheets backend)
- Web hosting (GitHub Pages, Netlify, etc.) OR local web server
- Modern web browser

### Installation (10 minutes)

#### 1. Set Up Google Sheets Backend

**Create the Spreadsheet:**
1. Create a new Google Sheet
2. Rename Sheet1 to exactly `Sheet1`
3. Add headers in row 1: `Player | Score | History`

**Deploy Apps Script:**
1. Open **Extensions → Apps Script**
2. Delete default code
3. Copy content from `updated-app-script.gs`
4. Paste into Apps Script editor
5. Click **Save** (💾)
6. Click **Deploy → New deployment**
7. Select type: **Web app**
8. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy**
10. **Copy the Web App URL**

#### 2. Configure Frontend

**Update API URL:**
1. Open `config.js`
2. Replace with your Web App URL:
```javascript
const CONFIG = {
  API_URL: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
};
```

#### 3. Deploy Frontend

**Option A: GitHub Pages**
1. Create new GitHub repository
2. Upload all files (except `updated-app-script.gs`)
3. Go to Settings → Pages
4. Select branch and save
5. Access via `https://username.github.io/repo-name/`

**Option B: Netlify**
1. Drag & drop project folder to Netlify
2. Site is live immediately

**Option C: Local Testing**
1. Use Python: `python -m http.server 8000`
2. Or use Live Server extension in VS Code
3. Access via `http://localhost:8000`

---

## 📖 Usage Guide

### Starting a Game

1. Open `admin.html` (or your protected version)
2. Click **"Start New Game"**
3. Add player names one by one
4. Score entry section appears automatically

### During Gameplay

**Adding Scores:**
1. Enter score in player's input field
2. Click **＋** or press **Enter**
3. Score is added and history updates
4. Input clears for next score

**Undoing Scores:**
1. Click **↺** next to player's score
2. Last score is removed
3. Total and history update

**Viewing Leaderboard:**
1. Display `index.html` on TV/monitor/tablet
2. Leaderboard auto-updates every 3 seconds
3. Leader is highlighted automatically
4. Sorted by score (highest first)

### Finishing a Game

1. Click **"Export Results"**
2. Confirm export
3. New timestamped sheet created in Google Sheets
   - Example: `Game_2026-02-12T10-30-45`
4. Sheet formatted with:
   - Dark header row
   - Sorted scores
   - Winner highlighted in yellow
   - Export timestamp

### Starting Next Game

1. Click **"🔄 New Game"**
2. Confirm reset
3. Add players for new game
4. Previous game preserved in timestamped sheet

---

## 🔒 Security Setup (Optional)

### Quick Password Protection (2 minutes)

**Use Case:** Prevent accidental or unauthorized access

1. Use `admin-protected.html` instead of `admin.html`
2. Edit line 84 and set password:
```javascript
const ADMIN_PASSWORD = "YourSecurePassword123!";
```
3. Rename files:
   - `admin.html` → `admin-backup.html`
   - `admin-protected.html` → `admin.html`

**Features:**
- 🔐 Login screen with password
- ⏱️ 1-hour session timeout
- 🚪 Logout button
- 📱 Works on all devices

For more security options, see `SECURITY-GUIDE.md`

---

## 🎨 Customization

### Change Colors

Edit CSS variables in `admin.css` or `style.css`:

```css
:root {
  --bg: #0b0f1a;        /* Background */
  --card: #111827;      /* Card background */
  --text: #f9fafb;      /* Text color */
  --green: #22c55e;     /* Success */
  --red: #ef4444;       /* Error */
  --blue: #3b82f6;      /* Info */
}
```

### Change Fonts

Player names use monospace by default. To change:

```css
.player strong {
  font-family: 'Your Font Here', monospace;
}
```

### Adjust Session Timeout

In `admin-protected.html`:

```javascript
const SESSION_DURATION = 3600000; // 1 hour (in milliseconds)
// Change to:
const SESSION_DURATION = 7200000; // 2 hours
```

### Modify Score Validation

In `utils.js`:

```javascript
const MIN_SCORE = 0;     // Minimum allowed score
const MAX_SCORE = 1000;  // Maximum allowed score
```

---

## 📱 Mobile Usage Tips

### Admin on Phone/Tablet
- Works great for score entry during games
- Tap in input, type score, tap **＋**
- Quick and responsive
- No keyboard needed for buttons

### Leaderboard on TV/Monitor
- Display `index.html` on large screen
- Auto-updates every 3 seconds
- No interaction needed
- Perfect for viewers

### Best Setup
- **Admin:** Phone/tablet (portable score entry)
- **Display:** TV/monitor/tablet (public viewing)
- **Both:** Update in real-time automatically

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Scores not saving
- **Check:** Google Apps Script deployed correctly
- **Verify:** API_URL in `config.js` is correct
- **Test:** Visit API_URL in browser (should return JSON)
- **Solution:** Redeploy Apps Script as "New version"

**Problem:** History shows total instead of individual scores
- **Check:** Using latest `updated-app-script.gs`
- **Fix:** Update backend script from repository
- **Verify:** History column in Sheet1 shows comma-separated scores

**Problem:** "Authorization required" error
- **Solution:** Run test function in Apps Script
- Click "Review permissions" and authorize
- Try deployment again

### Frontend Issues

**Problem:** Cursor jumps while typing
- **Check:** Using latest `admin.js`
- **Cause:** Old version had auto-refresh on admin page
- **Fix:** Download latest `admin.js` from repository

**Problem:** Loading spinner runs forever
- **Check:** Using latest `admin.js`
- **Fix:** Clear browser cache and reload
- **Verify:** Check browser console (F12) for errors

**Problem:** Password not working
- **Check:** Password in `admin-protected.html` is correct
- **Note:** Password is case-sensitive
- **Fix:** Clear browser cache, try again

**Problem:** Players not showing
- **Check:** Network connection
- **Verify:** API_URL is correct in `config.js`
- **Test:** Open browser console (F12), look for errors

### Display Issues

**Problem:** Not mobile responsive
- **Check:** Using latest CSS files
- **Verify:** Viewport meta tag present in HTML
- **Fix:** Download latest `style.css` and `admin.css`

**Problem:** Leaderboard not auto-updating
- **Check:** `index.html` open (not `admin.html`)
- **Verify:** Browser tab is active (not minimized)
- **Fix:** Refresh page manually

---

## 🔄 Recent Updates

### Version 2.0 (February 2026)

**Major Changes:**
- ✨ Consolidated admin interface (removed `current.html`)
- ✨ Timestamped Google Sheets exports
- ✨ Password protection option
- ✨ Fixed cursor jumping issue
- ✨ Enhanced mobile responsiveness
- ✨ Loading animations for score operations
- ✨ Monospace font for player names

**Bug Fixes:**
- ✅ Auto-refresh removed from admin (prevents cursor jumping)
- ✅ Loading spinner cleanup after score add
- ✅ Smart DOM updates (preserves input fields)
- ✅ Input validation improvements
- ✅ Error handling enhancements

**Performance:**
- ⚡ Reduced DOM manipulation
- ⚡ Fewer API calls
- ⚡ Optimized rendering
- ⚡ Better state management

---

## 🎯 Best Practices

### For Game Administrators

**Before the Game:**
- ✅ Test admin page works
- ✅ Verify Google Sheets connection
- ✅ Set up display screen
- ✅ Bookmark admin URL (or note password)

**During the Game:**
- ✅ Keep admin page open
- ✅ Enter scores immediately after each round
- ✅ Verify scores on leaderboard
- ✅ Use undo if mistakes happen

**After the Game:**
- ✅ Export results before starting new game
- ✅ Verify export in Google Sheets
- ✅ Screenshot final standings (backup)
- ✅ Reset for next game

### For Security

**Passwords:**
- 🔒 Use strong, unique passwords
- 🔒 Don't share publicly
- 🔒 Change after events
- 🔒 Use hidden URLs as extra layer

**Access Control:**
- 👥 Only share admin access with trusted people
- 👥 Keep leaderboard public for viewers
- 👥 Monitor who has access
- 👥 Revoke access when no longer needed

---

## 🚧 Known Limitations

- **Single Game:** Tracks one game at a time
- **Manual Player Entry:** No bulk import (yet)
- **Client-Side Validation:** Can be bypassed (backend validates too)
- **Basic Auth:** Password visible in source code (basic protection only)
- **No Player Editing:** Can't rename players after adding
- **No Score Editing:** Must undo and re-add to correct

---

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Multiple simultaneous games
- [ ] Bulk player import (CSV)
- [ ] Player statistics and analytics
- [ ] Game history browser
- [ ] Custom scoring rules
- [ ] Team-based scoring
- [ ] Game templates (save/load player lists)
- [ ] Sound effects on score updates
- [ ] Theme customization
- [ ] Offline mode with sync
- [ ] Mobile app versions
- [ ] Real-time multiplayer updates (WebSocket)
- [ ] Social sharing (Twitter, Facebook)
- [ ] QR code for quick leaderboard access
- [ ] Advanced analytics and charts

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Setup

```bash
# Clone repository
git clone https://github.com/navs7/board-game-standings.git

# Navigate to directory
cd board-game-standings

# Start local server
python -m http.server 8000

# Open browser
open http://localhost:8000
```

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👏 Acknowledgments

- Built with vanilla JavaScript (no frameworks needed!)
- Styled with modern CSS (CSS Grid, Flexbox, Custom Properties)
- Backend powered by Google Apps Script
- Icons: Unicode symbols (no icon libraries needed)
- Fonts: System fonts for performance

---

## 📞 Support

### Documentation
- **Setup Guide:** See "Quick Start" section above
- **Security:** See `SECURITY-GUIDE.md`
- **Backend:** See `BACKEND-GUIDE.md` and `DEPLOYMENT-GUIDE.md`
- **Troubleshooting:** See "Troubleshooting" section above

### Getting Help
1. Check documentation files
2. Review troubleshooting section
3. Check browser console for errors (F12)
4. Verify Google Sheets backend is working
5. Create issue on GitHub with details

### Common Questions

**Q: Can I use this for free?**
A: Yes! It's open source and free to use.

**Q: Do I need coding knowledge?**
A: Basic setup requires no coding. Customization needs some HTML/CSS/JS knowledge.

**Q: Can multiple people manage scores?**
A: Yes, but they each need the admin password. Only one person should enter scores at a time to avoid conflicts.

**Q: How many players can I track?**
A: Unlimited! Limited only by your Google Sheets row limit (millions).

**Q: Can I use it offline?**
A: No, requires internet for Google Sheets connection. Offline mode is a future enhancement.

**Q: Is my data secure?**
A: Data is stored in your Google Sheet. Use password protection for admin access. See `SECURITY-GUIDE.md` for options.

---

## 🌟 Star This Project

If you find this useful, please star the repository on GitHub! It helps others discover the project.

---

## 📊 Project Stats

- **First Release:** February 2026
- **Current Version:** 2.0
- **Lines of Code:** ~1,500
- **Files:** 15
- **Dependencies:** 0 (vanilla JavaScript!)

---

**Made with ❤️ for board game enthusiasts**

Enjoy your games! 🎲🎮🃏
