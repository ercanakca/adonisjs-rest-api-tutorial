'use strict'

const Admin = use('App/Models/Admin')
const {validateAll} = use('Validator')

class AdminController {

    create({view}) {

        return view.render('admin.create')
    }

    async store({auth, session, request, response}) {

        const data = request.only(['username', 'email', 'password', 'password_confirmation'])

        const validation = await validateAll(data, {
            username: 'required|unique:admins',
            email: 'required|email|unique:admins',
            password: 'required',
            password_confirmation: 'required_if:password|same:password',
        })

        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashExcept(['password'])

            return response.redirect('back')
        }

        delete data.password_confirmation

        const admin = await Admin.create(data)

        await auth.login(admin)

        return response.redirect('/')
    }
}

module.exports = AdminController
