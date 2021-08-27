import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePerfilValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

	
  public schema = schema.create({
	nome: schema.string({}, [
		rules.required(),
		rules.unique({ table: 'perfis', column: 'nome', whereNot: { id: this.refs.id } }),
	  ]),
  })

	
  public messages = {
	'nome.required': 'O campo {{ field }} é obrigatório',
    'nome.unique': 'O campo {{ field }} já esta em uso',
  }
}
