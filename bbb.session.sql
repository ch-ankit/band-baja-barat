<<<<<<< HEAD
select * from hoST
=======
 SELECT e.*,b.*,hostName,CONCAT(street,' ',city,' ',provience) AS location FROM booking b INNER JOIN event e ON e.id = eventId INNER JOIN host h ON h.vatNo = b.vatNo INNER JOIN organizer o ON o.id = e.organizerId Natural JOIN user  WHERE userName = '${req.query.userName}'
>>>>>>> 26b8c5d7dd2da0b778fa2d3cb3ca65388043d836
