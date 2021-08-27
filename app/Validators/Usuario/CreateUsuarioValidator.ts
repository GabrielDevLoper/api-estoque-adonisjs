import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUsuarioValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  
  public schema = schema.create({
	nome: schema.string({}, [
		rules.required(),
		
	  ]),

	cpf: schema.string({}, [
		rules.required(),
		rules.unique({ table: 'usuarios', column: 'cpf', caseInsensitive: true }),
	  ]),

	email: schema.string({}, [
		rules.required(),
		rules.unique({ table: 'usuarios', column: 'email', caseInsensitive: true }),
	  ]),

	password: schema.string({}, [
		rules.required(),
	  ]),
  })

  public messages = {
	  required: 'O campo {{ field }} é obrigatório',
	  unique: 'O campo {{ field }} já está sendo utilizado'
  }
}
