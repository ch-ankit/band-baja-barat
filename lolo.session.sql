CREATE TABLE basket(
   userName VARCHAR(255) ,
   modelNo VARCHAR(255),
   quantity INT,
   eventId INT ,
   PRIMARY KEY (userName,modelNo),
   FOREIGN KEY (userName) REFERENCES user(userName),
   FOREIGN KEY (modelNo) REFERENCES giftShop(modelNo),
   FOREIGN KEY (eventId) REFERENCES event(id)
 );