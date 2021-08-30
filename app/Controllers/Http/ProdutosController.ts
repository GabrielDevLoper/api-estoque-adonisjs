import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import CreateProdutoValidator from 'App/Validators/Produto/CreateProdutoValidator'
import UpdateProdutoValidator from 'App/Validators/Produto/UpdateProdutoValidator'

export default class ProdutosController {
  public async index ({ request }: HttpContextContract) {
    const { id_usuario } = request.qs()

    const produtos = await Produto.query()
    .preload('categoria')
    .preload('usuario', (qb) => {
      if(id_usuario){
        qb.where('id', id_usuario)
      }
    })
    .orderBy('id', 'desc')

    return produtos
  }

  public async store ({ request, auth }: HttpContextContract) {
    const data = request.only(['codigo', 'nome', 'quantidade_disponivel', 'valor_und', 'id_categoria'])

    await request.validate(CreateProdutoValidator)

    const produto = await Produto.create({
      ...data,
      id_usuario: auth.user?.id
    })

    return produto
  }

  public async show ({ params, response }: HttpContextContract) {
    const { id } = params

    const produto = await Produto.find(id)

    if(!produto){
      return response.notFound({ message: 'Produto não encontrado' })
    }

    return produto
  }

  public async update ({ request, params, response, auth }: HttpContextContract) {
    const { id } = params

    const produto = await Produto.find(id)

    const data = request.only(['codigo' ,'nome', 'quantidade_disponivel', 'valor_und', 'id_categoria'])

    if(!produto){
      return response.notFound({ message: 'Produto não encontrado' })
    }

    await request.validate(UpdateProdutoValidator)

    await produto.merge({
      ...data,
      id_usuario: auth.user?.id
    }).save()

    return produto

  }

  public async destroy ({ params, response }: HttpContextContract) {
    const { id } = params

    const produto = await Produto.find(id)

    if(!produto){
      return response.notFound({ message: 'Produto não encontrado' })
    }

    await produto.delete()

    return 
  }
}
