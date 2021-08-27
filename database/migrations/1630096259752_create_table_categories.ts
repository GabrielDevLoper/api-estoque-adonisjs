import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableCategories extends BaseSchema {
  protected tableName = 'categorias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').unique().notNullable()
      
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
