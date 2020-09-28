SELECT b.*, e.eventName
FROM basket b INNER JOIN event e ON e.id=b.eventId
WHERE userName = "mda"