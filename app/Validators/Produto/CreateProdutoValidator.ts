import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProdutoValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  
  public schema = schema.create({
	codigo: schema.string({}, [
		rules.required(),
		rules.unique({ table: 'produtos', column: 'codigo', caseInsensitive: true }),
	  ]),

	nome: schema.string({}, [
		rules.required(),
		
	  ]),

	quantidade_disponivel: schema.number([
		rules.required(),
		
	  ]),

	valor_und: schema.number([
		rules.required(),
	  ]),

	id_categoria: schema.number([
		rules.required(),
	  ]),
  })

  public messages = {
	  required: 'O campo {{ field }} é obrigatório',
	  unique: 'O campo {{ field }} já está sendo utilizado'
  }
}
