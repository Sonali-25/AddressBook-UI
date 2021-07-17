class Contact {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp("^([A-Z]{1}[A-Za-z]{2,}[ ]?){1,}$");
        if (nameRegex.test(name))
            this._name = name;
        else throw "Invalid Name!";
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
    get zip() {
        return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
    }
    toString() {
        return "id:" +this.id +", Name: " + this.name + ", Address: " + this.address + ", City: " + this.city + ", State: "
            + this.state + ", Zip: " + this.zip + ", Phone: " + this.phone;
    }
}