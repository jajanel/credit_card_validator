import { addCreditCardToDatabase, fetchCreditCardData } from "../http";
import { useState } from "react";

export default function Validator() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [thankYou, setThankYou] = useState(false);
    const [creditCards, setCreditCards] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);

    function verifyCreditCard(creditCard) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const expiryYear = parseInt(creditCard.expiryYear);
        const expiryMonth = parseInt(creditCard.expiryMonth);
        if (expiryYear < currentYear) {
            return false;
        } else if (expiryYear === currentYear && expiryMonth < currentMonth) {
            return false;
        } else if (creditCard.cardNumber.length < 13 || creditCard.cardNumber.length > 19) {
            return false;
        } else if (creditCard.cvv < 100 || creditCard.cvv > 9999) {
            return false;
        }
        return true;
    }

    async function addCreditCard(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById("credit-card-form"));
        const creditCard = {
            firstName: formData.get("firstname"),
            lastName: formData.get("lastname"),
            address: formData.get("address"),
            city: formData.get("city"),
            zipcode: formData.get("zip"),
            cardNumber: formData.get("creditcard"),
            expiryMonth: formData.get("expiration-month"),
            expiryYear: formData.get("expiration-year"),
            cvv: parseInt(formData.get("ccv"))
        };
        if (verifyCreditCard(creditCard)) {
            alert("We confirmed the credit card is valid.\nNow adding to database");
            setIsLoading(true);

            try {
                await addCreditCardToDatabase(creditCard);
                setThankYou(true);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("Credit card is invalid");
        }
    }

    async function seeDataBase() {
        try {
            const creditCards = await fetchCreditCardData();
            setCreditCards(creditCards);
            setButtonClicked(true);
        } catch (error) {
            alert("Failed to fetch credit card data");
        }
    }

    function resetForm() {
        setThankYou(false);
        setButtonClicked(false);
        setCreditCards([]);
    }

    return (
        <>
            {isLoading ? (
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center">
                        <h1 className="text-center bold text-white mb-5 mt-5">Currently adding your super secret personal information to our public database</h1>
                        <div className="spinner-border text-white p-4 spinner" role="status"></div>
                    </div>
                </div>
            ) : error ? (
                <div className="justify-content-center row d-flex text-white m-5">
                    <h1 className="text-center text-white m-2 pb-4">An error occurred, and we very unfortunately were not in the possibility of grabbing all of your personal information</h1>
                    <h4 className="text-center text-white pb-4"> Can you please try again, we really would like it</h4>
                    <button className="btn btn-info m-3 w-25" onClick={() => setError(false)}>Try again</button>
                </div>
            ) : thankYou ? (
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center">
                        <h1 className="text-center bold text-white mb-5 mt-5">Thank you for your super secret personal information</h1>
                        <h4 className="text-center text-white mb-5">We will keep it <i> safe and sound </i>in our public database</h4>
                        <button className="btn btn-primary w-25" onClick={buttonClicked ? resetForm : seeDataBase}>
                            {buttonClicked ? "Add a new one" : "See the database"}
                        </button>
                    </div>
                    {creditCards.length > 0 && (
                        <div className="row d-flex justify-content-center mt-5">
                            <table className="table table-dark table-striped w-75">
                                <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Card Number</th>
                                    <th scope="col">Expiry Date</th>
                                    <th scope="col">CVV</th>
                                </tr>
                                </thead>
                                <tbody>
                                {creditCards.map((card) => (
                                    <tr key={card.id}>
                                        <td>{card.firstName}</td>
                                        <td>{card.lastName}</td>
                                        <td>{card.cardNumber}</td>
                                        <td>{card.expiryMonth}/{card.expiryYear}</td>
                                        <td>{card.cvv}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <div className="container-fluid">
                    <form id="credit-card-form" onSubmit={addCreditCard}>
                        <div className="row d-flex justify-content-center">
                            <h1 className="text-center bold text-white mb-5 mt-5">Validity of your credit card</h1>
                            <div className="w-50">
                                <div className="mb-4">
                                    <h4 className="text-center text-white">Name on the card</h4>
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" maxLength={100} className="form-control rounded-3" placeholder="first name" name="firstname" />
                                            <label htmlFor="floatingInput">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" maxLength={100} className="form-control rounded-3" placeholder="last name" name="lastname" />
                                            <label htmlFor="floatingInput">Last Name</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4"><h4 className="text-center text-white">Enter your address</h4></div>
                                <div className="form-floating mb-3">
                                    <input type="text" maxLength={100} className="form-control rounded-3" placeholder="address" name="address" />
                                    <label htmlFor="floatingInput">Address</label>
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control rounded-3" placeholder="city" name="city" maxLength={50} />
                                            <label htmlFor="floatingInput">City</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="tel" inputMode="numeric" maxLength={7} className="form-control rounded-3" placeholder="zip code" name="zip" />
                                            <label htmlFor="floatingInput">Zip Code</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4"><h4 className="text-center text-white">Verify your credit card</h4></div>
                                <div className="form-floating mb-3">
                                    <input type="tel" inputMode="numeric" maxLength={19} pattern="[0-9\s]{13,19}" className="form-control rounded-3" placeholder="Credit card number" name="creditcard" />
                                    <label htmlFor="floatingInput">Credit card number</label>
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select className="form-control rounded-3" name="expiration-month">
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">March</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                            <label htmlFor="floatingInput">Expiration month</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select className="form-control rounded-3" name="expiration-year">
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                            </select>
                                            <label htmlFor="floatingInput">Expiration year</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="tel" inputMode="numeric" minLength={3} maxLength={4} pattern="[0-9]{3,4}" className="form-control rounded-3" placeholder="CCV" name="ccv" />
                                            <label htmlFor="floatingInput">CCV</label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-block w-100 btn-success">Check credit card</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}