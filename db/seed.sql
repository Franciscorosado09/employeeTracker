USE employeeTrackerDB

INSERT INTO department (department)
VALUES
    ('The Plastics-Managers'), 
    ('AV Jocks - Comms'), 
    ('Preps - Sales'), 
    ('Coolest People - Tech'),  
    ('Band Geeks - HR');




INSERT INTO roles (title, salary, department_id)
VALUES 
    ('CEO (Queen Bee)', 150000, 1),
    ('Manager', 100000, 1),
    ('Sales', 90000, 3),
    ('Software Engineer', 110000, 4),
    ('HRBP', 90000, 5);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Regina', 'George', 1, NULL),
('Karen', 'Smith', 2, 1),
('Gretchen', 'Wieners', 2, 1),
('Cady', 'Heron', 4, NULL),
('Janis', 'Ian', 5, NULL),
('Damian', 'Leigh', 5, NULL),
('Aaron', 'Samuels', 3, 1)