import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableProdutosEntradaSaidas extends BaseSchema {
  protected tableName = 'produtos_entrada_saidas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantidade').notNullable()
      table.integer('id_produto').unsigned().references('produtos.id')
      table.integer('id_usuario').unsigned().references('usuarios.id')
      table.boolean('status').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
