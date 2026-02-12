# Board Game Standings Tracker

A real-time scoreboard system for tracking board game scores with an admin panel and public leaderboard display.

## Features

✅ **Public Leaderboard** - Live updating scoreboard for players  
✅ **Admin Panel** - Start new games and add players  
✅ **Score Tracking** - Add and undo scores with history  
✅ **Real-time Updates** - Scores refresh automatically  
✅ **Mobile Responsive** - Works on all devices  
✅ **Error Handling** - Graceful failure with retry options  
✅ **Accessibility** - ARIA labels and keyboard navigation  

## Files Overview

```
├── index.html          # Public leaderboard view
├── admin.html          # Admin panel to start games
├── current.html        # Score entry interface
├── style.css           # Public leaderboard styles
├── admin.css           # Admin/current game styles
├── script.js           # Public leaderboard logic
├── admin.js            # Admin panel logic
├── current.js          # Score entry logic
├── utils.js            # Shared utilities & validation
└── config.js           # API configuration
```

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
- **Admin Panel**: `admin.html` - Start new games
- **Score Entry**: `current.html` - Add scores during gameplay

## Usage

### Starting a Game

1. Open `admin.html`
2. Click "Start New Game"
3. Add player names
4. Click "Go to Current Game"

### During Gameplay

1. On `current.html`, enter scores for each player
2. Click the ＋ button or press Enter to add
3. Click ↺ to undo the last score
4. The public leaderboard updates automatically

### Viewing Results

1. Display `index.html` on a screen for all to see
2. Leaderboard refreshes every 3 seconds
3. Leader is highlighted automatically

## Security Notes

⚠️ **IMPORTANT**: The current implementation has the API secret visible in client-side code. For production use, you should:

1. **Move authentication to backend**: Validate requests in your Google Apps Script
2. **Add rate limiting**: Prevent API abuse
3. **Use proper authentication**: Implement OAuth or session tokens
4. **Validate on server**: Never trust client-side validation alone

## Recent Improvements

✨ **Error Handling**: All API calls wrapped in try-catch blocks  
✨ **Input Validation**: Validates player names and scores  
✨ **Loading States**: Visual feedback during operations  
✨ **Accessibility**: ARIA labels and keyboard shortcuts  
✨ **Better UX**: Clear inputs after success, confirmation dialogs  
✨ **DRY Code**: Shared utilities to reduce duplication  
✨ **Constants**: Named constants instead of magic numbers  

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

### Can't add players?

- Ensure "Start New Game" was clicked first
- Check that player names are 2-30 characters
- Verify API is responding

### Leaderboard not refreshing?

- Check if tab is active (auto-refresh pauses when hidden)
- Try clicking the retry button if shown
- Refresh the page manually

## Future Enhancements

- [ ] Proper backend authentication
- [ ] Game history/archives
- [ ] Export to CSV/PDF
- [ ] Sound effects on score updates
- [ ] Dark/light theme toggle
- [ ] Player avatars
- [ ] Multi-game support

## License

MIT License - Feel free to modify and use!

## Contributing

Found a bug? Have a suggestion? Open an issue on GitHub!
