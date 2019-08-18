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
        deleteHomePageGift(id) {
            return this.$http.delete(`feed/gift/delete/${id}`)

        },
        addToUserCart(giftData, giftQnt) {
            let user = localStorage.getItem('username');
            let dataToSend = {
                giftName: giftData.giftName,
                price: giftData.price,
                giftQnt,
                user
            }
            return this.$http.post('feed/user/newOrder', dataToSend).then(({ data }) => {
                console.log(data);
            })
        },
        getGiftByDetails(id) {
            return this.$http.get(`feed/gift/details/${id}`)
        },
        getUserCartGifts() {
            return this.$http.get('feed/user/orders')
        },
        removeGiftFromCart(user,giftName){
            let dataObj = {
                user,
                giftName
            }
            return this.$http.post('feed/user/deleteSingleGift',dataObj)
        },
        addPendingOrders(data){
            return this.$http.post('feed/user/addPendingOrders',data)
        },
        removeUserOrders(user){
            let dataToSend = {
                user: user,
              }
            return this.$http.post('feed/user/delete',dataToSend).then(({data}) => console.log(data));
        }

    },

}