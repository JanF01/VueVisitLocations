export default class MarkerInfo {
    constructor(userId, lat, lng, title, country, description, date) {
        this.userId = userId;
        this.lat = lat;
        this.lng = lng;
        this.country = country;
        this.title = title;
        this.description = description;
        this.date = date;
    }

}