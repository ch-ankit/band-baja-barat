<<<<<<< HEAD
 SELECT e.*,b.*,hostName,CONCAT(street,' ',city,' ',provience) AS location FROM booking b INNER JOIN event e ON e.id = eventId INNER JOIN host h ON h.vatNo = b.vatNo INNER JOIN organizer o ON o.id = e.organizerId Natural JOIN user  WHERE userName = '${req.query.userName}'
=======
>>>>>>> 26d9b7dd72d9702cc1e16ac2a47160282b0ce790
