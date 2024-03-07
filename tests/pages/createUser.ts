import { faker } from '@faker-js/faker/locale/en';
export default class createUser {
    private firstName: string;
    private lastName: string;
    private totalPrice: number;
    private depositPaid: boolean;
    private bookingDates: {
        checkIn:string;
        checkOut:string;
    };
    private additionalNeeds: string;
    
    public getFirstName():string{
        return this.firstName;
    }

    public getLastName():string{
        return this.lastName;
    }

    public getTotalPrice():number{
        return this.totalPrice;
    }

    public getDepositPaid():boolean{
        return this.depositPaid;
    }

    public getBookingDates():{checkIn:string;checkOut:string}{
        return this.bookingDates;
    }

    public getCheckInDate(): string {
        return this.bookingDates.checkIn;
    }

    public getCheckOutDate(): string {
        return this.bookingDates.checkOut;
    }

    public getAdditionalNeeds():string{
        return this.additionalNeeds;
    }

    public setFirstName():void{
        this.firstName=faker.person.firstName();
    }

    public setLastName():void{
        this.lastName=faker.person.lastName();
    }
    
    public setTotalPrice():void{
        this.totalPrice=+faker.commerce.price();
    }

    public setDepositPaid():void{
        this.depositPaid=faker.datatype.boolean(1);
    }

    public setBookingDates():void{
        const checkIn=faker.date.soon().toISOString().split('T')[0];
        const checkOut=faker.date.soon({ days: 5, refDate: checkIn }).toISOString().split('T')[0];
        this.bookingDates={checkIn,checkOut};
    }

    public setAdditionalNeeds():void{
        this.additionalNeeds=faker.commerce.productName();
    }
    public setUserData() {
        this.setFirstName();
        this.setLastName();
        this.setTotalPrice();
        this.setDepositPaid();
        this.setBookingDates();
        this.setAdditionalNeeds();
    }
}