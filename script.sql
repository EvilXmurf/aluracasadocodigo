CREATE TABLE produtos (
    id int(11) NOT NULL AUTO_INCREMENT,
    titulo varchar(255) DEFAULT NULL,
    descricao text,
    preco decimal(10,2) DEFAULT NULL,
      PRIMARY KEY (id)
);