INSERT INTO department (name) 
 VALUES ('Command'), 
        ('Security'),
        ('Science'),
        ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Commanding Officer',2500 , 1),
        ('Executive Officer', 2100, 1),
        ('Second Officer', 1800, 3),
        ('Chief Engineering Officer', 1800, 4),
        ('Chief Security Officer', 1500 , 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Jean-Luc', 'Picard', 1, null),
        ('William', 'Riker', 2, 1),
        ('NFN', 'Data', 3, 2),
        ('Geordi', 'La Forge', 4, 3),
        ('Worf', 'son of Mogh',5, 4);