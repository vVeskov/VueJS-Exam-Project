export const giftService = {
    data() {
        return {
            gifts: [],
            details: [],
            
        };
    },
    methods: {

        getAllGifts() {
            return this.$http.get('feed/gifts')
                .then(({ data }) => {
                    this.gifts = data.gifts;
                })
        },
        getDetailsGift(id) {
            return this.$http.get(`feed/gift/details/${id}`).
                then(({ data }) => {
                    this.details = data.gift;
                })
        },
        create(giftName, description, imageUrl, price) {

            return this.$http.post("feed/gift/create", {
                giftName, description, imageUrl, price
            }
            )
        },
        edit(giftName, description, imageUrl, price, id) {
            let dataToSend = {
                giftName, description, imageUrl, price
            }
            return this.$http.put(`feed/gift/edit/${id}`, {
                dataToSend
            })
        },
        deleteHomePageGift(id){
            return this.$http.delete(`feed/gift/delete/${id}`).then()
            
        }

    },
    
}