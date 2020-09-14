SELECT *
FROM booking INNER JOIN event e ON e.id = eventId INNER JOIN organizer o ON o.id = e.organizerId
Natural JOIN user  WHERE userName = 'Demented'
