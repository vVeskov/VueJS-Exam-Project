export const giftService = {
    data() {
        return {
            gifts: [],
            details: []
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
            console.log(id);
            return this.$http.get(`feed/gift/details/${id}`).
                then(({ data }) => {
                    this.details = data.gift;

                })
        },
        create(giftName, description, imageUrl, price) {

            return this.$http.post("feed/gift/create", { 
                giftName, description, imageUrl, price 
            }
            ).then((res) => {
                console.log(res);
            })
        }
    }
}