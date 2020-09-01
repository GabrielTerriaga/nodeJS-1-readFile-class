const { deepStrictEqual, ok } = require("assert")
const database = require("./database")

const DEFAULT_ITEM_CADASTRAR = [
  {
    nome: "Flash",
    poder: "Speed",
    id: 1
  },
  {
    id: 2,
    nome: "Superman",
    poder: "Strengh"
  },
  {
    id: 3,
    nome: "Alien",
    poder: "Inteligence"
  }
]

describe("Suite de manipulação de herois", () => {
  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const resultado = await database.listar(expected.id)
    deepStrictEqual(resultado, expected)
  })
  // it('deve cadastrar um heroi, usando arquivos', async () => {
  //     const expected = {}

  //     ok(null, expected)
  // })
})
