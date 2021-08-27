import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import CreateUsuarioValidator from 'App/Validators/Usuario/CreateUsuarioValidator'
import UpdateUsuarioValidator from 'App/Validators/Usuario/UpdateUsuarioValidator'

export default class UsuariosController {
  public async index({ }: HttpContextContract) {
    const usuarios = await Usuario.all()

    return usuarios
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome', 'cpf', 'email', 'password'])

    await request.validate(CreateUsuarioValidator)

    const usuario = await Usuario.create(data)

    return usuario

  }

  public async show({ params, response }: HttpContextContract) { 
    const { id } = params

    const usuario = await Usuario.find(id)

    if(!usuario){
      return response.notFound({ message: 'Usuário não encontrado' })
    }

    return usuario
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params;

    const usuario = await Usuario.find(id)

    if(!usuario){
      return response.notFound({ message: 'Usuário não encontrado' })
    }

    const data = request.only(['nome','cpf','email','password'])

    await request.validate(UpdateUsuarioValidator)

    await usuario.merge(data).save()

    return usuario
   }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const usuario =  await Usuario.find(id)

    if(!usuario){
      return response.notFound({ message: 'Usuário não encontrado' })
    }

    await usuario.delete()

    return ;
   }
}
