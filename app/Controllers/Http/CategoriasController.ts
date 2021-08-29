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

    const categoria = await Categoria.create(data)

    return categoria
  }

  public async show ({ params, response }: HttpContextContract) {
    const { id } = params

    const categoria = await Categoria.find(id)

    if(!categoria){
      return response.notFound({ message: 'Categoria não encontrada'})
    }

    return categoria
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const { id } = params

    const categoria = await Categoria.find(id)

    if(!categoria){
      return response.notFound({ message: 'Categoria não encontrada'})
    }

    const data = request.only(['nome'])

    await categoria.merge(data).save()
  }

  public async destroy ({ params , response}: HttpContextContract) {
    const { id } = params

    const categoria = await Categoria.find(id)

    if(!categoria){
      return response.notFound({ message: 'Categoria não encontrada'})
    }

    await categoria.delete()

    return 
  }
}
