import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCategoriaValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
	nome: schema.string({}, [
		rules.required(),
		rules.unique({ table: 'categorias', column: 'nome', caseInsensitive: true }),
	  ]),
  })

  public messages = {
	required: 'O campo {{ field }} é obrigatório',
	unique: 'O campo {{ field }} já está sendo utilizado'
  }
}
