CREATE TABLE clientes (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf varCHAR (11),
    email VARCHAR(100) NOT NULL,
    celular varCHAR(20),
    endereco VARCHAR(250),
    bairro VARCHAR (100)
    cidade VARCHAR(100),
    cep varCHAR(10),
    PRIMARY KEY (id)
  );