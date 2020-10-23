const { readFile, writeFile } = require("fs")
const { promisify } = require("util")
const { v4: uuid } = require("uuid")

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json"
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8")
    return JSON.parse(arquivo.toString())
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo()
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true))
    return dadosFiltrados
  }

  async escreverArquivos(data) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data))
    return true
  }

  async cadastrar(hero) {
    const data = await this.obterDadosArquivo()
    const id = hero.id <= 2 ? hero.id : uuid()

    const heroWithId = {
      id,
      ...hero
    }
    const finalData = [...data, heroWithId]

    const result = await this.escreverArquivos(finalData)
    return result
  }

  async remover(id){
    if(!id){
      return await this.escreverArquivos([])
    }

    const data = await this.obterDadosArquivo()
    const indice = data.findIndex(item => item.id === parseInt(id))
    if(indice === -1){
      throw Error('Hero not exist')
    }
    data.splice(indice, 1)

    return await this.escreverArquivos(data)
  }

  async atualizar(id, data) {
    console.log('ID', id, 'DATA', data)
    const oldData = await this.obterDadosArquivo()
    const indice = oldData.findIndex(item => item.id === parseInt(id))

    if(indice === -1){
      throw Error('Hero not exist')
    }

    const actual = oldData[indice] //actual indice inside list
    console.log('actual', actual)
    const dataToUpdate = {
      ...actual,
      ...data
    }
    oldData.splice(indice, 1) //removed from list
    console.log('dados a atualizar', dataToUpdate)
    return await this.escreverArquivos([...oldData, dataToUpdate])
  }
}

module.exports = new Database()
