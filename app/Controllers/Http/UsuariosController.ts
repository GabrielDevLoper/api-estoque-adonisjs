import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async index({}: HttpContextContract) {
    const usuarios = await Usuario.all()

    return usuarios
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nome', 'cpf', 'email', 'password'])

    try {
      const usuario = await Usuario.create(data)

      return usuario
    } catch (error) {
      return response.badRequest({ message: 'Falha na tentativa de cadastro do usuario' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
