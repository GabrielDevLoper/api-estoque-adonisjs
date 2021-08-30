import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProdutoValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.params.id,
  })


  public schema = schema.create({
	codigo: schema.string({}, [
		rules.unique({ table: 'produtos', column: 'codigo', caseInsensitive: true, whereNot: { id: this.refs.id } }),
	  ]),
  })

  public messages = {
	  required: 'O campo {{ field }} é obrigatório',
	  unique: 'O campo {{ field }} já está sendo utilizado'
  }
}
