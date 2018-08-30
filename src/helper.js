const moment = require('moment')

module.exports = {
    commentString : (count) => {
        if (!count) {
            return 'Aucun commentaire'
        } else if (count === 1) {
            return '1 commentaire'
        }

        return count + ' commentaires'
    },
    // Representation of deleted member object
    deletedMember : {
        id: 0,
        attributes: {
            id: 0,
            email: 0,
            pseudo: 'Utilisateur supprimé',
        }
    },
    dateString : (date) => {
        date = moment(date);

        return ' - ' + date.format('DD/MM/YYYY') + ' à ' + date.format('HH:mm:ss')
    },
    resumeText : (text, max) => {
        if (text.length > max - 3) {
            text = text.slice(0, (max-3)) + '...'
        }

        return text
    },
}

