--Criação da tabela treinamentos
CREATE TABLE despesas (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  descricao text,
  mes int,
  ano int,
  preco decimal(10,2) DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  );
-- populando a tabela treinamentos
insert into treinamentos (titulo,descricao,preco) values
  ('Água', 01,2017,100.00,'CRIADO');
