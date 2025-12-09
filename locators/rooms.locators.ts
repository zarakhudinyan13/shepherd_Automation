export const RoomLocators = {
  roomNameInput: '#roomName',
  roomTypeSelect: '#type',
  accessibleSelect: '#accessible',
  priceInput: '#roomPrice',
  features: {
    wifi: '#wifiCheckbox',
    tv: '#tvCheckbox',
    radio: '#radioCheckbox',
    refreshments: '#refreshCheckbox',
    safe: '#safeCheckbox',
    views: '#viewsCheckbox'
  },
  createButton: '#createRoom',
  roomCard: '[data-testid="roomlisting"]',
  deleteButton: '.roomDelete'
} as const;
