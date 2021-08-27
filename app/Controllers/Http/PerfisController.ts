import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'
import CreatePerfilValidator from 'App/Validators/Perfil/CreatePerfilValidator'
import UpdatePerfilValidator from 'App/Validators/Perfil/UpdatePerfilValidator'

export default class PerfisController {
  public async index({ request }: HttpContextContract) {
    const perfis = await Perfil.all()

    return perfis 
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome'])

    await request.validate(CreatePerfilValidator)

    const perfil = await Perfil.create(data)

    return perfil
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;

    const perfil = await Perfil.findOrFail(id)

    return perfil
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params;

    const data = request.only(['nome'])

    const perfil = await Perfil.find(id)

    if (!perfil) {
      return response.notFound({ message: 'Perfil não encontrado' })
    }

    await request.validate(UpdatePerfilValidator)
  
    await perfil.merge(data).save()

    return perfil
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const perfil = await Perfil.find(id)

    if (!perfil) {
      return response.notFound({ message: 'Perfil não encontrado' })
    }

    perfil.delete()

    return ;
  }
}
