DROP DATABASE bb2;
CREATE DATABASE bb2;
USE bb2;

CREATE TABLE admin
(
  userName VARCHAR(255) ,
  password VARCHAR(255)
);

CREATE TABLE user
(
  firstName VARCHAR(255) ,
  lastName VARCHAR(255) ,
  middleName VARCHAR(255) ,
  userName VARCHAR(255) ,
  points INT DEFAULT 1,
  email VARCHAR(255) UNIQUE,
  photo VARCHAR(255),
  mobileNo VARCHAR(255),
  street VARCHAR(255) ,
  city VARCHAR(255),
  provience VARCHAR(255),
  PRIMARY KEY (userName)
);

CREATE TABLE host
(
  hostName VARCHAR(255),
  vatNo INT,
  totalHalls INT,
  description TEXT,
  profilePhoto VARCHAR(255),
  contactInfo VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  street VARCHAR(255),
  city VARCHAR(255),
  provience VARCHAR(255),
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  status VARCHAR(355) DEFAULT 'PENDING',
  PRIMARY KEY (vatNo)
);

CREATE TABLE hostHalls
(
  hallNo INT,
  vatNo INT,
  capacity INT,
  PRIMARY KEY(hallNo,vatNo),
  FOREIGN KEY(vatNo) REFERENCES host(vatNo)
);

CREATE TABLE band
(
  bandName VARCHAR (255),
  description text,
  profilePhoto VARCHAR(255),
  contactInfo VARCHAR(255),
  email VARCHAR (255),
  PRIMARY KEY (bandName)
);

CREATE TABLE giftShop
(
  modelNo VARCHAR(255) ,
  price INT ,
  quantity INT ,
  description text ,
  summary text,
  photo VARCHAR(255) ,
  rating DECIMAL(2,1) DEFAULT 0,
  name VARCHAR(255) ,
  PRIMARY KEY (modelNo)
);

CREATE TABLE organizer
(
  id INT
  AUTO_INCREMENT,
   userName VARCHAR
  (255),
   PRIMARY KEY
  (id),
   FOREIGN KEY
  (userName) REFERENCES user
  (userName)
 );

  CREATE TABLE event
  (
    id INT
    AUTO_INCREMENT,
   organizerId INT,
   eventName VARCHAR
    (255),
   groomName VARCHAR
    (255),
   brideName VARCHAR
    (255),
   eventDate DATE ,
   shift VARCHAR
    (255),
   eventStatus VARCHAR
    (255) DEFAULT "UPCOMING",
   hostStatus  VARCHAR
    (255) DEFAULT "PENDING",
   PRIMARY KEY
    (id),
   FOREIGN KEY
    (organizerId) REFERENCES organizer
    (id)
 );

    CREATE TABLE booking
    (
      id INT
      AUTO_INCREMENT ,
   vatNo INT  ,
   eventId INT  ,
   hallNo INT  ,
   expectedGuestNo INT  ,
   PRIMARY KEY
      (id),
   FOREIGN KEY
      (vatNo) REFERENCES host
      (vatNo),
   FOREIGN KEY
      (eventId) REFERENCES event
      (id)
 );

      CREATE TABLE guestList
      (
        id BIGINT
        AUTO_INCREMENT,
   userName VARCHAR
        (255) ,
   eventId INT ,
   PRIMARY KEY
        (id),
   FOREIGN KEY
        (userName) REFERENCES user
        (userName),
   FOREIGN KEY
        (eventId) REFERENCES event
        (id)
 );

        CREATE TABLE hostPhoto
        (
          id INT
          AUTO_INCREMENT,
   vatNo INT,
   caption VARCHAR
          (255),
   photo VARCHAR
          (255),
   PRIMARY KEY
          (id),
   FOREIGN KEY
          (vatNo) REFERENCES host
          (vatNo)
 );

          CREATE TABLE invitationPrototype
          (
            id INT
            AUTO_INCREMENT,
   draft text ,
   photo1 VARCHAR
            (255),
   photo2 VARCHAR
            (255),
   PRIMARY KEY
            (id)
 );

            CREATE TABLE invitationDraft
            (
              id INT
              AUTO_INCREMENT,
   eventId INT,
   backgroundImage1 VARCHAR
              (255),
   backgroundImage2 VARCHAR
              (255),
   draft text,
   groomFather varchar
              (255),
   groomMother varchar
              (255),
   brideFather varchar
              (255),
   brideMother varchar
              (255),
   honorableMention1 varchar
              (255),
   honorableMention2 varchar
              (255),
   PRIMARY KEY
              (id),
   FOREIGN KEY
              (eventId) REFERENCES event
              (id)
 );

              CREATE TABLE menu
              (
                id INT
                AUTO_INCREMENT,
   eventId INT ,
   snacks1 VARCHAR
                (255) ,
   snacks2 VARCHAR
                (255) ,
   snacks3 VARCHAR
                (255) ,
   mainDish1 VARCHAR
                (255) ,
   mainDish2 VARCHAR
                (255) ,
   sideDish1 VARCHAR
                (255) ,
   sideDish2 VARCHAR
                (255) ,
   desert1 VARCHAR
                (255) ,
   desert2 VARCHAR
                (255) ,
   coldDrinks VARCHAR
                (255) ,
   drinks VARCHAR
                (255) ,
   specialDish VARCHAR
                (255) ,
   extra VARCHAR
                (255) ,
   PRIMARY KEY
                (id),
   FOREIGN KEY
                (eventId) REFERENCES event
                (id)
 );

                CREATE TABLE orders
                (
                  orderNo INT
                  AUTO_INCREMENT,
   giftId VARCHAR
                  (255) ,
   quantity INT ,
   price float ,
   orderStatus VARCHAR
                  (255) ,
   eventId INT ,
   userName VARCHAR
                  (255) ,
   orderedDate DATE ,
   PRIMARY KEY
                  (orderNo),
   FOREIGN KEY
                  (giftId) REFERENCES giftShop
                  (modelNo),
   FOREIGN KEY
                  (userName) REFERENCES user
                  (userName),
   FOREIGN KEY
                  (eventId) REFERENCES event
                  (id)
 );

                  CREATE TABLE basket
                  (
                    userName VARCHAR(255) ,
                    modelNo VARCHAR(255),
                    quantity INT,
                    eventId INT ,
                    PRIMARY KEY (userName,modelNo, eventId),
                    FOREIGN KEY (userName) REFERENCES user(userName),
                    FOREIGN KEY (modelNo) REFERENCES giftShop(modelNo),
                    FOREIGN KEY (eventId) REFERENCES event(id)
                  );

                  CREATE TABLE rating
                  (
                    userName VARCHAR(255),
                    modelNo VARCHAR(255),
                    value DECIMAL(2,1),
                    PRIMARY KEY (userName,modelNo),
                    FOREIGN KEY (userName) REFERENCES user(userName),
                    FOREIGN KEY (modelNo) REFERENCES giftShop(modelNo)
                  );


                  INSERT INTO admin
                    (userName, password)
                  VALUES
                    ('admin', 'admin');


                  INSERT INTO giftShop
                    (
                    modelNo,
                    price,
                    quantity,
                    description,
                    summary,
                    photo,
                    name
                    )
                  VALUES
                    (
                      'BGO4644',
                      2612,
                      13,
                      'In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/215x205.jpg/cc0000/ffffff',
                      'Sesame Seed Black'
   ),
                    (
                      'FFB0846',
                      2088,
                      17,
                      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/205x132.jpg/ff4444/ffffff',
                      'Lettuce - Baby Salad Greens'
   ),
                    (
                      'FTV8398',
                      1589,
                      5,
                      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/214x148.jpg/cc0000/ffffff',
                      'Tart - Butter Plain Squares'
   ),
                    (
                      'FXQ5243',
                      3313,
                      20,
                      'Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/117x231.bmp/dddddd/000000',
                      'Sparkling Wine - Rose, Freixenet'
   ),
                    (
                      'GNH4070',
                      4104,
                      10,
                      'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/180x152.jpg/5fa2dd/ffffff',
                      'Fruit Salad Deluxe'
   ),
                    (
                      'GNU5949',
                      4311,
                      4,
                      'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/126x203.png/5fa2dd/ffffff',
                      'Trueblue - Blueberry 12x473ml'
   ),
                    (
                      'KWI1395',
                      3121,
                      18,
                      'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/130x119.bmp/5fa2dd/ffffff',
                      'Plastic Arrow Stir Stick'
   ),
                    (
                      'LQH3708',
                      3807,
                      11,
                      'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/185x134.jpg/ff4444/ffffff',
                      'Bread - Bistro Sour'
   ),
                    (
                      'LVP8204',
                      4963,
                      7,
                      'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/121x130.bmp/dddddd/000000',
                      'Chick Peas - Canned'
   ),
                    (
                      'MDH8956',
                      3002,
                      5,
                      'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/196x105.png/ff4444/ffffff',
                      'Danishes - Mini Raspberry'
   ),
                    (
                      'NDN7683',
                      2378,
                      19,
                      'Integer ac neque. Duis bibendum.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/137x138.png/dddddd/000000',
                      'Lobak'
   ),
                    (
                      'NHP1045',
                      122,
                      16,
                      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/103x151.jpg/ff4444/ffffff',
                      'Teriyaki Sauce'
   ),
                    (
                      'NUN3965',
                      3551,
                      4,
                      'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/126x123.jpg/5fa2dd/ffffff',
                      'Yogurt - Strawberry, 175 Gr'
   ),
                    (
                      'PAH9695',
                      1950,
                      15,
                      'Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/222x198.bmp/5fa2dd/ffffff',
                      'Appetizer - Asian Shrimp Roll'
   ),
                    (
                      'SDP0476',
                      3573,
                      20,
                      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/115x196.bmp/cc0000/ffffff',
                      'Ecolab Digiclean Mild Fm'
   ),
                    (
                      'SSQ1291',
                      1944,
                      6,
                      'Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/112x236.png/cc0000/ffffff',
                      'Dasheen'
   ),
                    (
                      'URF1331',
                      1647,
                      13,
                      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/140x166.png/5fa2dd/ffffff',
                      'Cheese Cloth No 100'
   ),
                    (
                      'VKA2433',
                      4545,
                      7,
                      'Duis mattis egestas metus. Aenean fermentum.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/233x227.png/cc0000/ffffff',
                      'Sage - Fresh'
   ),
                    (
                      'VYR7530',
                      2062,
                      2,
                      'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/226x166.jpg/dddddd/000000',
                      'Milk - 2% 250 Ml'
   ),
                    (
                      'XXQ1390',
                      3543,
                      12,
                      'Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
                      'potatopoteto \n size:lol \n weight: pow \n manufacturer:xyz \n',
                      'http://dummyimage.com/150x234.jpg/dddddd/000000',
                      'Bread - Sour Sticks With Onion'
   );

                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Puja', 'Marhatta', null, 'pujamatta', 84, 'pujamatta@gmail.com', 'https://robohash.org/voluptatibusveritatisperferendis.jpg?size=250x250&set=set1', '+977-9849585162', 'Baglung', 'Thamel', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Miss', 'Sachita', null, 'missula', 63, 'missula@gmail.com', 'https://robohash.org/omnisipsumvoluptas.jpg?size=250x250&set=set1', '+977-9845893300', 'Bidur', 'Gatthaghar', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Ritu', 'Banepali', null, 'ritubaali', 83, 'ritubaali@gmail.com', 'https://robohash.org/quasienimipsum.jpg?size=250x250&set=set1', '+977-9812702805', 'Ramgram', 'Annapurnatole', 5);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Urmila', 'Silwal', 'Oege', 'urmial', 24, 'urmial@gmail.com', 'https://robohash.org/exdictadoloremque.jpg?size=250x250&set=set1', '+977-9812110225', 'Malangwa', 'Bharatpur', 5);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Surakshya', 'Koirala', null, 'surakala', 49, 'surakala@gmail.com', 'https://robohash.org/etvoluptatema.jpg?size=250x250&set=set1', '+977-9801763115', 'Gorkha', 'Dhulikhel', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Kshitz', 'Shahi', 'Qhud', 'kshitzahi', 39, 'kshitzahi@gmail.com', 'https://robohash.org/ullamrecusandaenulla.jpg?size=250x250&set=set1', '+977-9871174741', 'Ghorahi', 'Kuleshwor', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Rekha', 'Pachhai', 'Rtbs', 'rekhapai', 39, 'rekhapai@gmail.com', 'https://robohash.org/liberominussit.jpg?size=250x250&set=set1', '+977-9867877697', 'Siraha', 'Narayangadh', 4);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Nirmali', 'Dawadi', 'Tftd', 'nirmdi', 87, 'nirmdi@gmail.com', 'https://robohash.org/praesentiumcommodivelit.jpg?size=250x250&set=set1', '+977-9845455306', 'Pokhara', 'Annapurnatole', 5);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Ranju', 'Kumari', 'Qeac', 'profraral', 28, 'profraral@gmail.com', 'https://robohash.org/quiadolorvoluptatum.jpg?size=250x250&set=set1', '+977-9889612167', 'Gaur', 'Thamel', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Shreya', 'Rasali', 'Qlni', 'shreali', 13, 'shreali@gmail.com', 'https://robohash.org/accusamuslaboriosamautem.jpg?size=250x250&set=set1', '+977-9804891541', 'Lekhnath', 'Kuleshwor', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Kris', 'Dev', 'Qprx', 'profkrrai', 43, 'profkrrai@gmail.com', 'https://robohash.org/quodoloresquam.jpg?size=250x250&set=set1', '+977-9829165389', 'Kirtipur', 'Thamel', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Buddha', 'Marhatta', null, 'profbta', 1, 'profbta@gmail.com', 'https://robohash.org/voluptasconsequaturaut.jpg?size=250x250&set=set1', '+977-9890713558', 'Narayan', 'Indrachowk', 3);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Pratik', 'Gauchan', 'Otis', 'pratikan', 23, 'pratikan@gmail.com', 'https://robohash.org/quaequiaaccusantium.jpg?size=250x250&set=set1', '+977-9816778829', 'Gorkha', 'Annapurnatole', 5);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Rani', 'Paudel', null, 'ranidel', 75, 'ranidel@gmail.com', 'https://robohash.org/deleniticupiditateadipisci.jpg?size=250x250&set=set1', '+977-9837532278', 'Janakpur', 'Thamel', 6);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Ujjwal', 'Lamichhane', null, 'ujjwane', 52, 'ujjwane@gmail.com', 'https://robohash.org/iustoporrovoluptatem.jpg?size=250x250&set=set1', '+977-9831702442', 'Janakpur', 'Minbhawan', 2);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Nirajan', 'Ranabhat', null, 'nirajaat', 73, 'nirajaat@gmail.com', 'https://robohash.org/autmolestiasaut.jpg?size=250x250&set=set1', '+977-9848023280', 'Malangwa', 'Tahachal', 1);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Prekshya', 'Lamichhane', 'Qpbz', 'prekne', 65, 'prekne@gmail.com', 'https://robohash.org/doloreasperioresculpa.jpg?size=250x250&set=set1', '+977-9898005673', 'Biratnagar', 'Bagbazar', 1);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Sabina', 'Panta', null, 'sabinnta', 48, 'sabinnta@gmail.com', 'https://robohash.org/quidolorumearum.jpg?size=250x250&set=set1', '+977-9843007673', 'Gulariya', 'Indrachowk', 6);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Shashank', 'Balami', null, 'mrshmi', 41, 'mrshmi@gmail.com', 'https://robohash.org/fugitsuntvoluptas.jpg?size=250x250&set=set1', '+977-9809570630', 'Siraha', 'Bharatpur', 7);
                  insert into user
                    (firstName, lastName, middleName, userName, points, email, photo, mobileNo, city, street, provience)
                  values
                    ( 'Junu', 'Himanshu', null, 'junushu', 20, 'junushu@gmail.com', 'https://robohash.org/nullacumquevoluptatem.jpg?size=250x250&set=set1', '+977-9841533375', 'Nepalganj', 'Narayangadh', 6);


                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (1, 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.
 Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.
 Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.
 Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
 Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
 In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
 Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
 Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
 Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.
 Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 'http://dummyimage.com/157x151.png/ff4444/ffffff', 'http://dummyimage.com/245x211.jpg/5fa2dd/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (2, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
 Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
 Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
 Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.
 Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.
 Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'http://dummyimage.com/250x184.bmp/dddddd/000000', 'http://dummyimage.com/218x216.jpg/dddddd/000000');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (3, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
 Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
 Fusce consequat. Nulla nisl. Nunc nisl.
 Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
 In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
 Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
 Sed ante. Vivamus tortor. Duis mattis egestas metus.
 Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.
 Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.
 Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'http://dummyimage.com/122x227.bmp/cc0000/ffffff', 'http://dummyimage.com/206x248.jpg/ff4444/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (4, 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
 In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
 Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
 Sed ante. Vivamus tortor. Duis mattis egestas metus.
 Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.
 Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.
 Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'http://dummyimage.com/158x197.jpg/ff4444/ffffff', 'http://dummyimage.com/220x211.jpg/cc0000/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (5, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
 Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
 Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
 In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
 Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.
 Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.
 Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.
 Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 'http://dummyimage.com/163x224.jpg/ff4444/ffffff', 'http://dummyimage.com/202x200.jpg/5fa2dd/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (6, 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.
 Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.
 Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.
 Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.
 Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 'http://dummyimage.com/180x131.jpg/ff4444/ffffff', 'http://dummyimage.com/208x247.jpg/cc0000/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (7, 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
 Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
 Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
 In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
 Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.
 Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'http://dummyimage.com/118x187.bmp/5fa2dd/ffffff', 'http://dummyimage.com/222x245.jpg/dddddd/000000');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (8, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
 Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
 Fusce consequat. Nulla nisl. Nunc nisl.
 Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
 In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'http://dummyimage.com/181x220.png/dddddd/000000', 'http://dummyimage.com/217x222.jpg/ff4444/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (9, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.
 Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
 Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
 Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
 Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
 In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
 Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.
 Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.
 Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 'http://dummyimage.com/143x185.bmp/5fa2dd/ffffff', 'http://dummyimage.com/219x228.jpg/cc0000/ffffff');

                  insert into invitationPrototype
                    (id, draft, photo1, photo2)
                  values
                    (10, 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
 Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
 Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.
 Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
 In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
 Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.
 Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.
 Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.
 Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.
 Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 'http://dummyimage.com/239x204.png/dddddd/000000', 'http://dummyimage.com/228x232.jpg/cc0000/ffffff');

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Amrapali banquet', 406820, 4, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
 Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.
 Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.
 Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'https://picsum.photos/200/300?random=1', '+977 9848-196186', 'egajewski0@hud.gov', 'Tahachal', 'Taplejung', 2, 27.686386, 83.432426);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Alfa house', 771982, 2, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.
 Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
 Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.
 Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

 Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 'https://picsum.photos/200/300?random=6', '+977 9877-442279', 'dimlock1@nature.com', 'Minbhawan', 'Butwal', 3, 28.98728, 80.165184);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Anmol catering service', 830058, 5, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
 Sed ante. Vivamus tortor. Duis mattis egestas metus.
 Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 'https://picsum.photos/200/300?random=9', '+977 9882-030045', 'acrimin2@histats.com', 'Kusaltar', 'Bhimdatta', 4, 28.683359, 80.608063);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('City banquet', 571317, 2, 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.
 Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
 Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'https://picsum.photos/200/300?random=9', '+977 9833-200736', 'bromi3@usnews.com', 'Bharatpur', 'Dhangadhi', 1, 27.005915, 84.859085);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Namaste kitchen and banquet', 990441, 1, 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.
 Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.
 Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
 Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.
 Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'https://picsum.photos/200/300?random=7', '+977 9878-114312', 'pcloake4@yolasite.com', 'Thamel', 'Birgunj', 2, 27.700001, 85.333336);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Crystal banquet', 493744, 5, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
 In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
 Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
 Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'https://picsum.photos/200/300?random=7', '+977 9877-084997', 'supham5@ning.com', 'Indrachowk', 'Kathmandu', 2, 27.429071, 85.029716);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Tripureshwor party palace', 488366, 5, 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
 In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.
 Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
 Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'https://picsum.photos/200/300?random=4', '+977 9846-199148', 'sstadding6@free.fr', 'Thamel', 'Hetauda', 4, 27.700769, 85.30014);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Star banquet', 458869, 1, 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
 Phasellus in felis. Donec semper sapien a libero. Nam dui.
 Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.
 Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.
 Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'https://picsum.photos/200/300?random=1', '+977 9884-101212', 'rtander7@livejournal.com', 'Gograha', 'Kathmandu', 2, 27.686386, 83.432426);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Durbar banquet', 202698, 5, 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
 Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
 Fusce consequat. Nulla nisl. Nunc nisl.
 Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
 In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 'https://picsum.photos/200/300?random=6', '+977 9801-285722', 'lbanck8@fc2.com', 'Sinamanghal', 'Taplejung', 3, 28.98728, 80.165184);

                  insert into host
                    ( hostName, vatNo, totalHalls, description, profilePhoto, contactInfo, email, street, city, provience, latitude, longitude)
                  values
                    ('Heritage garden banquet', 455238, 2, 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
 Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.
 Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.
 Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.
 Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 'https://picsum.photos/200/300?random=8', '+977 9861-989498', 'ccreddon9@biglobe.ne.jp', 'Gograha', 'Butwal', 1, 28.683359, 80.608063);

                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (1, 406820, 'https://picsum.photos/200/300?random=7', 'Pellentesque viverra pede ac diam.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (2, 771982, 'https://picsum.photos/200/300?random=2', 'Nulla ut erat id mauris vulputate elementum.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (3, 830058, 'https://picsum.photos/200/300?random=5', 'In est risus, auctor sed, tristique in, tempus sit amet, sem.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (4, 571317, 'https://picsum.photos/200/300?random=1', 'Phasellus in felis.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (5, 990441, 'https://picsum.photos/200/300?random=7', 'Donec quis orci eget orci vehicula condimentum.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (6, 493744, 'https://picsum.photos/200/300?random=6', 'Duis aliquam convallis nunc.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (7, 488366, 'https://picsum.photos/200/300?random=3', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (8, 458869, 'https://picsum.photos/200/300?random=2', 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (9, 202698, 'https://picsum.photos/200/300?random=9', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (10, 455238, 'https://picsum.photos/200/300?random=3', 'Proin at turpis a pede posuere nonummy.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (11, 406820, 'https://picsum.photos/200/300?random=7', 'Quisque id justo sit amet sapien dignissim vestibulum.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (12, 771982, 'https://picsum.photos/200/300?random=5', 'Nulla nisl.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (13, 830058, 'https://picsum.photos/200/300?random=9', 'Morbi a ipsum.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (14, 571317, 'https://picsum.photos/200/300?random=8', 'Pellentesque ultrices mattis odio.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (15, 990441, 'https://picsum.photos/200/300?random=2', 'In hac habitasse platea dictumst.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (16, 493744, 'https://picsum.photos/200/300?random=5', 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (17, 488366, 'https://picsum.photos/200/300?random=5', 'Nulla nisl.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (18, 458869, 'https://picsum.photos/200/300?random=9', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (19, 202698, 'https://picsum.photos/200/300?random=2', 'Pellentesque viverra pede ac diam.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (20, 455238, 'https://picsum.photos/200/300?random=8', 'Suspendisse potenti.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (21, 406820, 'https://picsum.photos/200/300?random=9', 'Morbi porttitor lorem id ligula.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (22, 771982, 'https://picsum.photos/200/300?random=6', 'Nam dui.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (23, 830058, 'https://picsum.photos/200/300?random=6', 'Sed accumsan felis.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (24, 571317, 'https://picsum.photos/200/300?random=7', 'Nulla suscipit ligula in lacus.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (25, 990441, 'https://picsum.photos/200/300?random=2', 'Donec vitae nisi.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (26, 493744, 'https://picsum.photos/200/300?random=5', 'Cras pellentesque volutpat dui.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (27, 488366, 'https://picsum.photos/200/300?random=1', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (28, 458869, 'https://picsum.photos/200/300?random=3', 'Curabitur convallis.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (29, 202698, 'https://picsum.photos/200/300?random=9', 'Maecenas pulvinar lobortis est.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (30, 455238, 'https://picsum.photos/200/300?random=6', 'Nulla tempus.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (31, 406820, 'https://picsum.photos/200/300?random=3', 'Vivamus vel nulla eget eros elementum pellentesque.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (32, 771982, 'https://picsum.photos/200/300?random=3', 'Maecenas rhoncus aliquam lacus.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (33, 830058, 'https://picsum.photos/200/300?random=8', 'Integer tincidunt ante vel ipsum.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (34, 571317, 'https://picsum.photos/200/300?random=5', 'Nam nulla.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (35, 990441, 'https://picsum.photos/200/300?random=8', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (36, 493744, 'https://picsum.photos/200/300?random=8', 'In hac habitasse platea dictumst.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (37, 488366, 'https://picsum.photos/200/300?random=3', 'Nulla mollis molestie lorem.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (38, 458869, 'https://picsum.photos/200/300?random=3', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (39, 202698, 'https://picsum.photos/200/300?random=6', 'Integer a nibh.');
                  insert into hostPhoto
                    (id, vatNo, photo, caption)
                  values
                    (40, 455238, 'https://picsum.photos/200/300?random=7', 'Praesent blandit.');

                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 406820, 403);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 771982, 362);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 830058, 427);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 571317, 468);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 990441, 483);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 493744, 351);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 488366, 345);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 458869, 303);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 202698, 368);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (1, 455238, 393);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 406820, 296);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 771982, 481);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 830058, 311);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 571317, 352);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 990441, 345);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 493744, 310);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 488366, 277);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 458869, 298);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 202698, 414);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (2, 455238, 265);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 406820, 296);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 771982, 481);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 830058, 311);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 571317, 352);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 990441, 345);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 493744, 310);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 488366, 277);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 458869, 298);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 202698, 414);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (3, 455238, 265);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (4, 488366, 277);
                  insert into hostHalls
                    (hallNo, vatNo, capacity)
                  values
                    (5, 488366, 277);


                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('ABBA   band', 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.', 'cbeine0@list-manage.com', 'https://robohash.org/eligendiconsequaturnihil.jpg?size=250x250&set=set1', '+977 9883-671420');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('AC/DC   band', 'Maecenas pulvinar lobortis est.', 'hhadlington1@imgur.com', 'https://robohash.org/facereeligendieaque.bmp?size=250x250&set=set1', '+977 9842-328513');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('Aerosmith   band', 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', 'tschroeder2@furl.net', 'https://robohash.org/sedvoluptatibusreiciendis.jpg?size=250x250&set=set1', '+977 9887-139900');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('The Allman Brothers Band   band', 'Fusce consequat. Nulla nisl. Nunc nisl.', 'wcharrier3@odnoklassniki.ru', 'https://robohash.org/utsedneque.png?size=250x250&set=set1', '+977 9862-021191');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('Amadou and Mariam   band', 'Etiam pretium iaculis justo.', 'mgillis4@opensource.org', 'https://robohash.org/omniseaquesapiente.bmp?size=250x250&set=set1', '+977 9852-446282');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('The Andrews Sisters   band', 'In hac habitasse platea dictumst.', 'lorneblow5@mapy.cz', 'https://robohash.org/facerelaborumqui.png?size=250x250&set=set1', '+977 9805-819149');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('The Animals   band', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.', 'bmurname6@spotify.com', 'https://robohash.org/utidet.bmp?size=250x250&set=set1', '+977 9844-813457');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('Arcade Fire   band', 'Donec semper sapien a libero. Nam dui.', 'jportch7@sina.com.cn', 'https://robohash.org/doloribusquoddolor.jpg?size=250x250&set=set1', '+977 9803-934272');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('The Band   band', 'Duis consequat dui nec nisi volutpat eleifend.', 'mrate8@multiply.com', 'https://robohash.org/veroexdoloribus.png?size=250x250&set=set1', '+977 9809-560640');
                  insert into band
                    ( bandName, description, email, profilePhoto, contactInfo)
                  values
                    ('The Beach Boys   band', 'Aliquam quis turpis eget elit sodales scelerisque.', 'hjoskowicz9@typepad.com', 'https://robohash.org/aspernaturaliquamlibero.bmp?size=250x250&set=set1', '+977 9856-547409');
