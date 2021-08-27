import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeUpdate, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public ativo: boolean

  @column({ serializeAs: null })
  public id_perfil: number

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Perfil, {
    localKey: 'id_perfil',
    foreignKey: 'id', 
  })
  public perfil: HasOne<typeof Perfil>

  @beforeSave()
  public static async hashPassword(usuario: Usuario) {
    if (usuario.$dirty.password) {
      usuario.password = await Hash.make(usuario.password)
    }
  }
}
