DROP TABLE IF EXISTS realtors;
DROP TABLE IF EXISTS properties;

CREATE TABLE realtors(
    id SERIAL PRIMARY KEY ,
    name TEXT ,
    age INT
);

CREATE TABLE properties (
    id SERIAL,
    name TEXT ,
    for_sale BOOLEAN ,
    realtor_id INT NOT NULL REFERENCES realtors(id)
);