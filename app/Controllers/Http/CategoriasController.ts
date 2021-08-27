import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import CreateCategoriaValidator from 'App/Validators/Categoria/CreateCategoriaValidator'

export default class CategoriasController {
  public async index ({}: HttpContextContract) {
    const categorias = await Categoria.all()

    return categorias
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['nome'])

    await request.validate(CreateCategoriaValidator)

    const usuario = await Categoria.create(data)

    return usuario
  }

  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
