export const giftService = {
    data() {
        return {
            gifts: [],
            details: [],
            allData: [],
            orders: [],
            
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
            return this.$http.post('feed/user/newOrder', dataToSend)
        },
        getGiftByDetails(id) {
            return this.$http.get(`feed/gift/details/${id}`)
        },
        getUserCartGifts() {
            return this.$http.get('feed/user/orders')
        },
        removeGiftFromCart(user, giftName) {
            let dataObj = {
                user,
                giftName
            }
            return this.$http.post('feed/user/deleteSingleGift', dataObj)
        },
        addPendingOrders(data) {
            return this.$http.post('feed/user/addPendingOrders', data)
        },
        removeUserOrders(user) {
            let dataToSend = {
                user: user,
            }
            return this.$http.post('feed/user/delete', dataToSend)
        },
        getUsersOrders() {
            return this.$http.get('feed/user/getPendingOrders').then(({ data }) => {
                this.allData = data['orders'];
                if (this.allData) {
                    for (let i = 0; i < this.allData.length; i++) {
                        for (let j = 0; j < this.allData[i].giftsName.length; j++) {

                            let giftQnt = this.allData[i].giftsName[j].slice(-1);
                            this.allData[i].giftsName[j] = this.allData[i].giftsName[j].substr(0, this.allData[i].giftsName[j].length - 1);
                            this.allData[i].giftsName[j] = this.allData[i].giftsName[j] + " - " + "Quantity: " + giftQnt;
                        }
                    }
                }
                this.orders = this.allData;
                
            })
        },
        approveUserOrder(id){
            
                let data = {
                    id:id
                }
                return this.$http.post('feed/user/deleteSingleOrder',data)
        }

    },

}