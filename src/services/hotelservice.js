import Api from '@/services/api'

export default {
    fetchGuests () {
        // eslint-disable-next-line no-console
        console.log("all good");
        return Api().get('/guests')
    },

    postGuests (guest) {
        return Api().post('/guests', guest,
            { headers: {'Content-type': 'application/json'} })
    },

    deleteGuest (id) {
        return Api().delete(`/guests/${id}`)
    },

    assignGuest (id) {
        return Api().put(`/rooms/assign/${id}`)
    },

    checkoutGuest (id) {
        return Api().put(`/rooms/checkout/${id}`)
    }
}