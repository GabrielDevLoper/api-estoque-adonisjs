import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfisController {
  public async index({ request }: HttpContextContract) {
    const perfis = await Perfil.all()

    return perfis 
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome'])

    const perfil = await Perfil.create(data)

    return perfil
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;

    const perfil = await Perfil.findOrFail(id)

    return perfil
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params;

    const data = request.only(['nome'])

    const perfil = await Perfil.findOrFail(id)

    perfil.merge(data)

    return perfil
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;

    const perfil = await Perfil.findOrFail(id)

    perfil.delete()

    return ;
  }
}
