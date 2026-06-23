const blockedDateNotices = [
  {
    date: '2026-06-26',
    message:
      'Freitag, 26. Juni ist ausgebucht. Bitte wählen Sie ein anderes Datum.',
    visibleUntil: '2026-06-27',
  },
]

function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function isNoticeVisible(notice, now = new Date()) {
  return now < parseLocalDate(notice.visibleUntil)
}

export function getActiveBlockedDateNotices(now = new Date()) {
  return blockedDateNotices.filter((notice) => isNoticeVisible(notice, now))
}

export function getBlockedDateNotice(dateStr, now = new Date()) {
  const notice = blockedDateNotices.find((entry) => entry.date === dateStr)
  if (!notice || !isNoticeVisible(notice, now)) return null
  return notice.message
}
