create table job(

jobid VARCHAR(10) PRIMARY KEY,
jobtype VARCHAR(50) NOT NULL,
title VARCHAR(50) NOT NULL,
description VARCHAR(1000) NOT NULL,
salary VARCHAR(50) NOT NULL,
location VARCHAR(100) NOT NULL,
companyid VARCHAR(10) REFERENCES company(companyid) NOT NULL


)

create table company(

companyid VARCHAR(10) PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(1000) NOT NULL,
contactPhone VARCHAR(20) NOT NULL,
contactEmail VARCHAR(50) NOT NULL
)

create table users(

username VARCHAR(50) PRIMARY KEY,
password VARCHAR(100) NOT NULL,
refreshToken VARCHAR(200)
)
alter table users add column roles JSONB NOT NULL DEFAULT '{"User":2024}'

ALTER TABLE job
RENAME COLUMN description TO jobdescription;