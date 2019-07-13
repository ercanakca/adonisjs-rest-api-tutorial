'use strict'

class SessionController {

    create({view}) {

        return view.render('session.create')
    }

    async store({auth, request, response, session}) {

        const {username, password} = request.all()

        try {

            await auth.attempt(username, password)

            const user = auth.user
            await auth
                .authenticator('jwt')
                .generate(user)

        } catch (e) {

            session.flashExcept(['password'])

            session.flash({error: e + 'We cannot find any account with these credentials...'})

            return response.redirect('login')
        }

        return response.redirect('/')
    }

    async delete({auth, response}) {

        await auth.logout()

        return response.redirect('/')
    }
}

module.exports = SessionController
