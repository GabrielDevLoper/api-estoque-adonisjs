import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Categoria from './Categoria'

export default class Produto extends BaseModel {
  public static table = 'produtos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public codigo: string

  @column()
  public nome: string

  @column()
  public quantidade_disponivel: number

  @column()
  public valor_und: number

  @column({ serializeAs: null })
  public id_usuario: number

  @column({ serializeAs: null })
  public id_categoria: number

  @column()
  public status: boolean

  @hasOne(() => Usuario, {
    localKey: "id_usuario",
    foreignKey: "id"
  })
  public usuario: HasOne<typeof Usuario>

  @hasOne(() => Categoria, {
    localKey: "id_categoria",
    foreignKey: "id"
  })
  public categoria: HasOne<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
