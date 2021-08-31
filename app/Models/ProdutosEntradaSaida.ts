import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Produto from './Produto'

export default class ProdutosEntradaSaida extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantidade: number

  @column({ serializeAs: null })
  public id_usuario: number

  @column({ serializeAs: null })
  public id_produto: number

  @column()
  public status: boolean

  @hasOne(() => Usuario, {
    localKey: 'id_usuario',
    foreignKey: 'id',
  })
  public usuario: HasOne<typeof Usuario>

  @hasOne(() => Produto, {
    localKey: 'id_produto',
    foreignKey: 'id',
  })
  public produto: HasOne<typeof Produto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
