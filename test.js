const { deepStrictEqual, ok } = require("assert")
const database = require("./database")

const DEFAULT_ITEM_CADASTRAR ={
    id: 1,
    nome: "Flash",
    poder: "Speed"
  }

  const DEFAULT_ITEM_ATUALIZAR ={
    id: 2,
    nome: 'Superman',
    poder: 'Strength'
  }

describe("Suite de manipulação de herois", () => {
  before(async () =>{
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
  })
  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [result] = await database.listar(expected.id)

    deepStrictEqual(result, expected)
  })

  it('deve cadastrar um heroi, usando arquivos', async () => {
      const expected = DEFAULT_ITEM_CADASTRAR
      const result = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
      const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

      deepStrictEqual(actual, expected)
  })

  it('Deve remover um heroi por id', async () => {
    const expected = true
    const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepStrictEqual(result, expected)
  })

  it('Deve atualizar heroi por id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Money'
    }

    const newHero = {
      nome: "Batman",
      poder: "Money"
    }

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, newHero)
    const [result] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

    deepStrictEqual(result, expected)
  })
})
