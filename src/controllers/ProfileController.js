const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get()})
    },

    async update(req, res) {
        // req.bory para pegar o dados
        const data = req.body
        //definir quantas semans te m no ano
        const weeksPerYear = 52
        // remover as semans de ferias do ano para pegar quantas semnas tem 1 mes
        const weekPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        //quantas hora por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //total de horas trabalhadas mensais
        const monthlyTotalHours = weekTotalHours * weekPerMonth
        //qual o valor da minha hora?
        const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        }) 

        return res.redirect('/profile')
    }
}