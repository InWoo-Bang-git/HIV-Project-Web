CREATE TABLE Users (id VARCHAR(255) NOT NULL, name VARCHAR(255),email VARCHAR(255),phone VARCHAR(255),role VARCHAR(255),password VARCHAR(1000),token VARCHAR(1000),
PRIMARY KEY (id));

CREATE TABLE Demographics (demographic_id VARCHAR(255), user_id VARCHAR(255),ethnicity VARCHAR(255),
residential_status VARCHAR(255),nationality VARCHAR(255),state VARCHAR(255), postal_code VARCHAR(255), city VARCHAR(255),
gender VARCHAR (255), sexual_orientation VARCHAR (255),
PRIMARY KEY (demographic_id), FOREIGN KEY (user_id) REFERENCES Users (id));

CREATE TABLE Test_Kit_Order (order_id VARCHAR(255), order_date DATE,
PRIMARY KEY (order_id));

CREATE TABLE User_Test_Kit_Order (user_test_kit_order_id VARCHAR(255), user_id VARCHAR(255), order_id VARCHAR (255),
FOREIGN KEY (user_id) REFERENCES Users (id), FOREIGN KEY (order_id) REFERENCES Test_Kit_Order (order_id));

CREATE TABLE Test_Result (result_id VARCHAR(255), result_outcome VARCHAR(255), result_date DATE,
PRIMARY KEY (result_id));

CREATE TABLE User_Test_Result (user_test_result_id VARCHAR(255), customer_id VARCHAR(255), result_id VARCHAR (255),
PRIMARY KEY (user_test_result_id), FOREIGN KEY (customer_id) REFERENCES Users (id), FOREIGN KEY (result_id) REFERENCES Test_Result (result_id));

CREATE TABLE Notification_preference (preference_id VARCHAR(255), user_id VARCHAR(255), notification_period BIGINT,
custom_message VARCHAR (1000), last_sent BIGINT, FOREIGN KEY (user_id) REFERENCES Users (id));

DELETE From User_Test_Kit_Order;

DELETE From Test_Kit_Order;

DELETE From Users;

DELETE From Notification_preference;

INSERT INTO Users (id, name, email, password, role) VALUES 
('001','John Doe', 'john.doe@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('002','Jane Smith', 'jane.smith@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('003','Samuel Johnson', 'samuel.johnson@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('004','Rebecca Hunt', 'rebecca.hunt@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('005','Martin Gale', 'martin.gale@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('006','Lucy Morris', 'lucy.morris@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('007','Ethan Knight', 'ethan.knight@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('008','Olivia Park', 'olivia.park@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('009','Nathan Lee', 'nathan.lee@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('010','Sophia Jones', 'sophia.jones@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'user'),
('011','Admin Robert', 'admin.robert@example.com', '$2a$04$IP64bwtb1rnwKzLclsv5oOwNAQ8ODK.GfRAECtkiQ4sOsVu4URHA6', 'admin');

INSERT INTO Test_Kit_Order (order_id,order_date) VALUES ('001','2024-01-01');

INSERT INTO User_Test_Kit_Order (user_test_kit_order_id,user_id,order_id) VALUES ('001','002','001');

INSERT INTO Demographics (demographic_id, user_id, ethnicity, residential_status, nationality,state,postal_code,city,gender,sexual_orientation) 
VALUES ('001','001','Australian', 'temporary', 'Australian', 'VIC', '3222', 'Malvern', 'Male', 'Straight'),
('002','002','Australian', 'temporary', 'Australian', 'NSW', '3111', 'TestCityNSW', 'Female', 'Bisexual'),
('003','003','Australian', 'temporary', 'Australian', 'WA', '3333', 'TestCityWA', 'NonBinary', 'Homosexual');

INSERT INTO Notification_preference (preference_id,user_id,last_sent,notification_period,custom_message) VALUES ('001','002', 1696460224234, 7889238000,'some item');



  -- DB tip_be_user_service user burnet pw 1234
  -- sudo psql -U burnet -d tip_be_user_service -W  

  -- DB tip_be_user_service user burnet pw 1234
  -- sudo psql -U burnet -d tip_be_user_service -W