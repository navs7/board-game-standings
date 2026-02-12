# Board Game Standings Tracker

A real-time scoreboard system for tracking board game scores with a consolidated admin panel and public leaderboard display.

## Features

✅ **Public Leaderboard** - Live updating scoreboard for players  
✅ **Consolidated Admin Panel** - Start games, add players, and enter scores in one place  
✅ **Score Tracking** - Add and undo scores with history  
✅ **Real-time Updates** - Scores refresh automatically  
✅ **Mobile Responsive** - Works on all devices  
✅ **Error Handling** - Graceful failure with retry options  
✅ **Accessibility** - ARIA labels and keyboard navigation  
✅ **Auto-resume** - Continues existing game on page reload  

## Files Overview

```
├── index.html          # Public leaderboard view
├── admin.html          # Consolidated admin panel (NEW!)
├── style.css           # Public leaderboard styles
├── admin.css           # Admin panel styles
├── script.js           # Public leaderboard logic
├── admin.js            # Admin panel logic (consolidated)
├── utils.js            # Shared utilities & validation
└── config.js           # API configuration
```

### 🎉 What Changed?

**Consolidated Interface**: The `current.html` and `current.js` files have been removed. All functionality is now in a single `admin.html` page that flows smoothly through:
1. Start new game
2. Add players
3. Enter scores (appears automatically)
4. Export results

**Benefits**:
- ✅ Less redundancy
- ✅ Smoother workflow
- ✅ No page navigation needed
- ✅ Automatically resumes if you refresh

## Setup Instructions

### 1. Configure Your API

Edit `config.js` with your Google Apps Script URL:

```javascript
const CONFIG = {
  API_URL: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
};
```

### 2. Upload Files

Upload all files to your web hosting service or GitHub Pages.

### 3. Access the App

- **Public Scoreboard**: `index.html` - Display on a TV/monitor
- **Admin Panel**: `admin.html` - Everything you need in one place!

## Usage

### Starting a Game

1. Open `admin.html`
2. Click "Start New Game"
3. Add player names (they appear below as you add them)
4. Start entering scores immediately - no page navigation needed!

### During Gameplay

1. Each player gets their own score entry section
2. Enter score and click ＋ or press Enter to add
3. Click ↺ to undo the last score
4. Add more players anytime from the top section
5. The public leaderboard (`index.html`) updates automatically

### Viewing Results

1. Display `index.html` on a screen for all to see
2. Leaderboard refreshes every 3 seconds
3. Leader is highlighted automatically

### Continuing a Game

If you refresh or reopen `admin.html` during an active game:
- ✅ The page automatically detects the existing game
- ✅ Shows all players and their current scores
- ✅ You can continue entering scores immediately

## Security Notes

⚠️ **IMPORTANT**: The current implementation has the API secret visible in client-side code. For production use, you should:

1. **Move authentication to backend**: Validate requests in your Google Apps Script
2. **Add rate limiting**: Prevent API abuse
3. **Use proper authentication**: Implement OAuth or session tokens
4. **Validate on server**: Never trust client-side validation alone

## Recent Improvements

✨ **Consolidated Interface**: Single admin page for all tasks  
✨ **Error Handling**: All API calls wrapped in try-catch blocks  
✨ **Input Validation**: Validates player names and scores  
✨ **Loading States**: Visual feedback during operations  
✨ **Accessibility**: ARIA labels and keyboard shortcuts  
✨ **Better UX**: Clear inputs after success, confirmation dialogs  
✨ **Auto-resume**: Continues existing games on reload  
✨ **DRY Code**: Shared utilities to reduce duplication  
✨ **Constants**: Named constants instead of magic numbers  
✨ **Auto-refresh**: Scores update automatically while admin is open  

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Keyboard Shortcuts

- `Enter` on input fields: Submit the current form
- Tab navigation for accessibility

## Troubleshooting

### Scores not updating?

- Check your internet connection
- Verify the API URL in `config.js`
- Check browser console for errors
- The admin page auto-refreshes every 3 seconds

### Can't add players?

- Ensure "Start New Game" was clicked first
- Check that player names are 2-30 characters
- Verify API is responding

### Leaderboard not refreshing?

- Check if tab is active (auto-refresh pauses when hidden)
- Try clicking the retry button if shown
- Refresh the page manually

### Admin page looks different?

- We've consolidated everything into one page
- `current.html` is no longer needed
- Everything flows more smoothly now!

## Architecture

### Workflow
```
admin.html
    ↓
Start New Game
    ↓
Add Players (show score entry automatically)
    ↓
Enter Scores (players update in real-time)
    ↓
Export Results
    ↓
Start New Game (cycle repeats)
```

### Auto-refresh Behavior
- Starts when first player is added
- Updates every 3 seconds while game section is visible
- Pauses when tab is hidden (resumes when visible)
- Stops when starting a new game

## Future Enhancements

- [ ] Proper backend authentication
- [ ] Game history/archives
- [ ] Export to CSV/PDF
- [ ] Sound effects on score updates
- [ ] Dark/light theme toggle
- [ ] Player avatars
- [ ] Multi-game support
- [ ] Statistics and charts

## License

MIT License - Feel free to modify and use!

## Contributing

Found a bug? Have a suggestion? Open an issue on GitHub!

---

**Pro Tip**: Keep `admin.html` open on your phone/tablet while playing, and display `index.html` on a TV/monitor for everyone to see the leaderboard!
