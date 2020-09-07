const { deepStrictEqual, ok } = require("assert")
const database = require("./database")

const DEFAULT_ITEM_CADASTRAR ={
    id: 1,
    nome: "Flash",
    poder: "Speed"
  }

describe("Suite de manipulação de herois", () => {
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
})
