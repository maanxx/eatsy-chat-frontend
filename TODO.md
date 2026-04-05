# EatsyChat Real-time UI Implementation TODO

## Current Progress

- [x] Create TODO.md
- [x] 1. Install dependencies (npm i executed)
- [x] 2. Create ChatContext.jsx
- [x] 3. Update main.jsx (add providers)
- [x] 4. Update App.jsx (add Router, Layout, routes)
- [x] 5. Update LogIn.jsx (add navigation on success)
- [x] 6. Create Chat components: ChatLayout.jsx, ChatList.jsx, ChatWindow.jsx, ImagePreview.jsx
- [x] 7. Create pages/ChatDashboard.jsx (tabs: list/groups/stats)
- [x] 8. Create StatsDashboard.jsx (graphs)
- [x] 9. Socket.io integration stub (connect, events)
- [x] 10. Add extras: typing, online, emojis, search, notifications
- [x] 11. Test & polish UI
- [x] 12. Document DB schema in README.md

## 🔥 ADVANCED REAL-TIME FEATURES (ZALO-LIKE)

- [ ] 13. Message Status (sent, delivered, seen)
- [ ] 14. Typing Indicator (real-time typing...)
- [ ] 15. Online/Offline Presence (last seen)
- [ ] 16. Push Notifications (new message alert)
- [ ] 17. Read Receipts (ai đã xem tin nhắn)
- [ ] 18. Message Reactions (like, heart, haha...)
- [ ] 19. Reply / Quote Message
- [ ] 20. Forward Message
- [ ] 21. File Upload (image, video, file)
- [ ] 22. Voice Message (record + send audio)
- [ ] 23. Emoji Picker + Sticker UI
- [ ] 24. Search Messages (full-text search)
- [ ] 25. Pin Conversation / Pin Message
- [ ] 26. Unread Count Badge
- [ ] 27. Group Chat Management (add/remove member)
- [ ] 28. Admin Role in Group
- [ ] 29. Block / Report User
- [ ] 30. Dark Mode UI
- [ ] 31. Infinite Scroll (load old messages)
- [ ] 32. Auto Scroll + Scroll Position حفظ
- [ ] 33. Message Edit & Delete
- [ ] 34. Conversation Preview (last message)
- [ ] 35. Media Gallery (ảnh đã gửi)

- Socket stub + extras implemented
- All errors fixed
- README/DB ready

**DB Schema Summary:** (PostgreSQL)

- users, orders, chats, chat_members, messages
  Details in plan message above.
