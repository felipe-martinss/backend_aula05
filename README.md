# Projeto BackEnd
 ### Projeto BackEnd de gerenciamento de dados para a Empresa solicitante, o projeto consiste em seguir as operações CRUD (Create, Read, Update e Delete).

## Tecnologias
- JS
- Node
- JSON
- Thunder Client
- Visual Studio Code
  
## Explicando o Código
### Arquivo dados.json
Dentro do arquivo json foi criado alguns itens (periféricos), sendo utilizado como um tipo de banco de dados

Exemplo retirado do código para demonstrar o formato em que foi criado os itens:
```json
[
    {
        "id": "01",
        "item": "Mouse Ergonômico Rapoo",
        "local": "Escritório 02",
        "dataRegistro": "2025-04-06",
        "valor": 198.00,
        "patrimonio": "PAT-03305"
    }
] 
```
### Arquivo server.js

### 1. Primeiro é feito a importação do express e dos dados.json e define o nome dos dados.json como itens
```javascript
const express = require('express')
const itens = require('../dados.json')
```

### 2. Função de listar os itens
```javascript
const listaritens = (req, res) => {
    res.send(itens)
}
```
Ela lista todos os itens que estão presente naquele momento nos itens

### 3. Função de listar um item em especifico
```javascript
const listaritensEspecifico = (req, res) => {
    const id = req.params.id
    let status = 0

    itens.forEach((itens, indice) => {
        if (itens.id == id) {
            res.send(itens)
            status = 1
        }
    })
```

Na função de listar por id é feito o seguinte, primeiro definimos a variável, depois é obtido o ID diretamente do parâmetro da URL e definimos uma variável status para servir como uma "marcação" do código

Depois é percorrido o array para localizar o item correspondente.

Retorna o item encontrado ou reporta o erro 404 (Not Found) caso o ID não exista.

### 4.  Função de cadastrar itens
```javascript
const cadastraritens = (req, res) => {
    if (!req.body || req.body.id != undefined) {
        itens.push(req.body)
        res.send("Novo item adicionado com sucesso!")
    } else {
        res.send("Erro ao adicionar um novo item.")
    }
}
```
Na função de cadastrar um novo item, primeiro definimos a variável, depois definimos um comando if, onde ele diz o seguinte, se não houver uma requisição do body ou se id do body for diferente de undefined, então ele manda o conteúdo do body para o banco de dados, imprimindo a mensagem "Novo item adicionado com sucesso!"

Caso estes requisitos não forem atendidos (else), o comando não é executado e imprime a mensagem "Erro ao adicionar um novo item"

### 5. Função de atualizar um item da lista
```javascript
const atualizaritens = (req, res) => {
    const id = req.params.id
    const dados = req.body
    let status = 0

  itens.forEach((item, indice) => {
        if (item.id == id) {
            item.item = dados.item;
            item.local = dados.local;
            item.dataRegistro = dados.dataRegistro;
            item.valor = dados.valor;
            item.patrimonio = dados.patrimonio;
            status = 1;
        }
    });

     if (status == 1){
            res.send("Dados atualizados com sucesso")
        } else{
            res.status(404).send("Os dados não foram encontrados")
        }
    }
```
Na função de cadastrar um novo item é feito o seguinte, definimos a varivel, depois é obtido o ID diretamente do parâmetro da URL, definimos uma constante chamada dados que contém os requerimentos do body, depois definimos a variavel status para servir como uma "marcação" do código.

Definimos um forEach, e dentro dele um comando if, onde ele diz que cada item adicionado "é igual" aos items que já haviam, assim os trocando.

por fim é feito um comando if, onde ele diz que caso o status esteja igual a 1 (ou seja, ele percorreu o forEach sem problemas), ele imprime a mensagem "Dados atualizados com sucesso", caso o contrario aconteca (ele não percorreu o forEach corretamente) ele informa o erro 404 e imrpime "Os dados não foram encontrados"

### 6. Função de deletar um item da lista
```javascript
  const deletaritens = (req, res) => {
        const id = req.params.id
        let status = 0

        itens.forEach((item, indice) => {
            if (item.id == id) {
                itens.splice(indice, 1)
                status = 1
            }
        })

        if (status == 1) {
            res.send("Item excluído com sucesso!")
        } else {
            res.status(404).send("Item não encontrado")
        }
    }
```
Na função de deletar um item é feito o seguinte, definimos a variavel, novamente é obtido o ID diretamente do parâmetro da URL e definimos a variavel status, com o mesmo propósito

criamos um forEach que diz que, para cada item do banco de dados ele observa se o id do que foi pedido para deletar é igual ao id da lista, caso cumpra os requisitos ele é deletado com o comando splice, e marcando que status é igual a 1

depois, é criado outro comando if, que diz que caso o status seja igual a 1 ele imprime a mensagem "Item excluído com sucesso!", caso o contrário ele reporta o erro 404 e imprime "Item não encontrado"

## Para testar
- Clone este repositório
- Abra com o VsCode
- Execute o comando:
```node
  npm run dev
```
- Copie o link do servidor que aparecerá no terminal
- Utilizando a extensão Thunder Client, teste as funções de app: 
```javascript
app.get("/dados", listaritens)
app.post("/dados", cadastraritens)
app.get("/dados/:id", listaritensEspecifico)
app.put("/dados/:id", atualizaritens)
app.delete("/dados/:id", deletaritens)
```
