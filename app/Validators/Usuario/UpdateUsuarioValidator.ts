import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUsuarioValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

	
  public schema = schema.create({
	cpf: schema.string({}, [
		rules.unique({ table: 'usuarios', column: 'cpf', whereNot: { id: this.refs.id } }),
	  ]),  
	  
	email: schema.string({}, [
		rules.unique({ table: 'usuarios', column: 'email', whereNot: { id: this.refs.id } }),
	  ]), 
  })

	
  public messages = {
	required: 'O campo {{ field }} é obrigatório',
	unique: 'O campo {{ field }} já está sendo utilizado'
  }
}
