import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableAddColumnFkIdPerfils extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('ativo').nullable().defaultTo(1).after('password')
      table.integer('id_perfil').unsigned().nullable().references('perfis.id').after('ativo')

      
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('id_perfil')
      table.dropColumn('id_perfil')
      table.dropColumn('ativo')
    })
  }
}
