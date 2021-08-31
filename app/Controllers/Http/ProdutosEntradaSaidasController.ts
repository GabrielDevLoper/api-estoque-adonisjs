import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import ProdutosEntradaSaida from 'App/Models/ProdutosEntradaSaida'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProdutosEntradaSaidasController {
  public async index({ request }: HttpContextContract) {
    const { saida, entrada } = request.qs()

    const produtosEntradaSaida = await ProdutosEntradaSaida.query()
      .where((qb) => {
        if (saida) {
          return qb.where('status', 0)
        }

        if (entrada) {
          return qb.where('status', 1)
        }
      })
      .preload('produto')
      .preload('usuario')

    return produtosEntradaSaida
  }

  public async entrada({ request, response, params, auth }: HttpContextContract) {
    const data = request.only(['quantidade'])

    const { idProduto } = params

    const produto = await Produto.find(idProduto)

    if (!produto) {
      return response.notFound({ message: 'Produto não encontrado' })
    }
    const trx = await Database.transaction()

    const entradaProduto = await ProdutosEntradaSaida.create(
      {
        id_produto: produto.id,
        id_usuario: auth.user?.id,
        quantidade: data.quantidade,
        status: true,
      },
      trx
    )

    await produto
      .merge({
        quantidade_disponivel: produto.quantidade_disponivel + entradaProduto.quantidade,
        id_usuario: auth.user?.id,
      })
      .save()

    await trx.commit()

    return entradaProduto
  }

  public async saida({ request, response, params, auth }: HttpContextContract) {
    const data = request.only(['quantidade'])

    const { idProduto } = params

    const produto = await Produto.find(idProduto)

    if (!produto) {
      return response.notFound({ message: 'Produto não encontrado' })
    }

    if (produto.quantidade_disponivel - data.quantidade < 0) {
      return response.badRequest({
        message: `Produto sem estoque suficiente, por favor insira uma quantidade menor que ${produto.quantidade_disponivel}`,
      })
    }

    const saidaProduto = await ProdutosEntradaSaida.create({
      id_produto: produto.id,
      id_usuario: auth.user?.id,
      quantidade: data.quantidade,
      status: false,
    })

    await produto
      .merge({
        quantidade_disponivel: produto.quantidade_disponivel - saidaProduto.quantidade,
        id_usuario: auth.user?.id,
      })
      .save()

    if (produto.quantidade_disponivel === 0) {
      await produto.merge({ status: false }).save()
    }

    return saidaProduto
  }
}
