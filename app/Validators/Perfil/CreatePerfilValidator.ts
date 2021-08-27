import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePerfilValidator {
  constructor (protected ctx: HttpContextContract) {
  }


  public schema = schema.create({
	nome: schema.string({}, [
		rules.required(),
		rules.unique({ table: 'perfis', column: 'nome', caseInsensitive: true }),
	  ]),
  })

  public messages = {
	'nome.required': 'O campo {{ field }} é obrigatório',
    'nome.unique': 'O campo {{ field }} já foi cadastrado',
  }
}
