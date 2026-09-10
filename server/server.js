const express = require('express')
const itens = require('../dados.json')

const listaritens = (req, res) => {
    res.send(itens)
}

const listaritensEspecifico = (req, res) => {
    const id = req.params.id
    let status = 0

    itens.forEach((itens, indice) => {
        if (itens.id == id) {
            res.send(itens)
            status = 1
        }
    })

    if (status == 0) {
        res.status(404).send("Item não encontrado");
    }
}


const cadastraritens = (req, res) => {
    if (!req.body || req.body.id != undefined) {
        itens.push(req.body)
        res.send("Novo item adicionado com sucesso!")
    } else {
        res.send("Erro ao adicionar um novo item.")
    }
}

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

const porta = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/dados", listaritens)
app.post("/dados", cadastraritens)
app.get("/dados/:id", listaritensEspecifico)
app.put("/dados/:id", atualizaritens)
app.delete("/dados/:id", deletaritens)

app.listen(porta, () => {
    console.log(`Servidor http://127.0.0.1:${porta}/dados`)
})