'use strict'
const User = use('App/Models/User')
const {validate} = use('Validator')

class ApiController {

    async register({request, auth, response}) {

        const rules = {
            email: 'required|unique:users,email',
            password: 'required',
            language_code: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                status: false,
                data: '',
                message: validation.messages()
            })
        }

        let user = await User.create(request.all())

        let token = await auth.authenticator('jwt').attempt(request.input('email'), request.input('password'))

        Object.assign(user, token)

        return response.json({status: true, data: user, message: 'ok!'})

    }

    async login({request, auth, response}) {

        let {email, password} = request.all()

        try {

            if (await auth.attempt(email, password)) {

                let user = await User.findBy('email', email)

                let token = await auth.generate(user)

                Object.assign(user, token)

                return response.json({status: true, data: user, message: 'ok!'})

            }

        } catch (e) {
            return response.json({status: false, data: '', message: e})
        }
    }

    async profileUpdate({request, auth, response}) {

    }

}

module.exports = ApiController
