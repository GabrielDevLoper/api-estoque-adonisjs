import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import Produto from 'App/Models/Produto'
import CreateProdutoValidator from 'App/Validators/Produto/CreateProdutoValidator'
import UpdateProdutoValidator from 'App/Validators/Produto/UpdateProdutoValidator'

export default class ProdutosController {
  public async index({ request }: HttpContextContract) {
    const { idUsuario } = request.qs()

    const produtos = await Produto.query()
      .preload('usuario', (qb) => {
        if (idUsuario) {
          qb.where('id', idUsuario)
        }
      })
      .preload('categoria')
      .orderBy('id', 'desc')

    return produtos
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const data = request.only([
      'codigo',
      'nome',
      'quantidade_disponivel',
      'valor_und',
      'id_categoria',
    ])

    const categoria = await Categoria.find(data.id_categoria)

    if (!categoria) {
      return response.notFound({ message: 'Categoria selecionada não encontrada' })
    }

    await request.validate(CreateProdutoValidator)

    const produto = await Produto.create({
      ...data,
      id_usuario: auth.user?.id,
    })

    return produto
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const produto = await Produto.find(id)

    if (!produto) {
      return response.notFound({ message: 'Produto não encontrado' })
    }

    return produto
  }

  public async update({ request, params, response, auth }: HttpContextContract) {
    const { id } = params

    const produto = await Produto.find(id)

    const data = request.only([
      'codigo',
      'nome',
      'quantidade_disponivel',
      'valor_und',
      'id_categoria',
    ])

    if (!produto) {
      return response.notFound({ message: 'Produto não encontrado' })
    }

    await request.validate(UpdateProdutoValidator)

    await produto
      .merge({
        ...data,
        id_usuario: auth.user?.id,
      })
      .save()

    return produto
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const produto = await Produto.find(id)

    if (!produto) {
      return response.notFound({ message: 'Produto não encontrado' })
    }

    await produto.delete()

    return
  }
}
